import { describe, expect, it, vi } from 'vitest';
import type { QuoteRequest } from '@prisma/client';
import { createRequest, type RequestDeps, type SubmitInput } from './createRequest';

const NOW = new Date('2026-10-02T12:00:00Z');

function fakeDeps(overrides: Partial<RequestDeps> = {}) {
  const rows: QuoteRequest[] = [];
  const deps: RequestDeps = {
    nextRef: vi.fn(async () => 'AF-1001'),
    insertRequest: vi.fn(async (row) => {
      const saved = { ...row, id: rows.length + 1, status: 'new', adminNote: null, emailError: null, createdAt: NOW, updatedAt: NOW } as QuoteRequest;
      rows.push(saved);
      return saved;
    }),
    countRecentByIp: vi.fn(async () => 0),
    setEmailError: vi.fn(async () => {}),
    uploadFile: vi.fn(async (ref: string, file: File) => `https://blob.example/requests/${ref}/${file.name}`),
    notifyOwner: vi.fn(async () => {}),
    confirmCustomer: vi.fn(async () => {}),
    now: () => NOW,
    newToken: () => 'tok123',
    ...overrides,
  };
  return { deps, rows };
}

const preview = new File(['png'], 'preview.png', { type: 'image/png' });
const signInput: SubmitInput = {
  kind: 'sign',
  data: {
    name: 'Ana',
    email: 'ana@x.com',
    spec: {
      text: 'Open Late',
      font: 'Pacifico',
      glowColor: 'Pink',
      tubeColor: 'White',
      size: { width: 10, height: 3 },
      backing: 'Cut to Shape',
      location: 'inside',
    },
  },
  file: preview,
};

describe('createRequest', () => {
  it('saves a valid sign request and returns its ref', async () => {
    const { deps, rows } = fakeDeps();
    expect(await createRequest(signInput, 'iphash', deps)).toEqual({ ok: true, ref: 'AF-1001', token: 'tok123' });
    expect(rows).toHaveLength(1);
    expect(rows[0]).toMatchObject({ ref: 'AF-1001', type: 'sign', name: 'Ana', priceCents: 1800, ipHash: 'iphash', viewToken: 'tok123' });
  });

  it('ignores a client-sent price', async () => {
    const { deps, rows } = fakeDeps();
    const tampered = { ...signInput, data: { ...signInput.data, price: 1, priceCents: 1 } } as SubmitInput;
    await createRequest(tampered, 'iphash', deps);
    expect(rows[0].priceCents).toBe(1800);
    expect(JSON.stringify(rows[0].details)).not.toContain('price');
  });

  it('saves even when the owner email throws', async () => {
    const { deps, rows } = fakeDeps({ notifyOwner: vi.fn(async () => { throw new Error('Resend down'); }) });
    expect(await createRequest(signInput, 'iphash', deps)).toEqual({ ok: true, ref: 'AF-1001', token: 'tok123' });
    expect(rows).toHaveLength(1);
    expect(deps.setEmailError).toHaveBeenCalledWith('AF-1001', expect.stringContaining('Resend down'));
  });

  it('returns 429 on the 6th submission in an hour', async () => {
    const { deps } = fakeDeps({ countRecentByIp: vi.fn(async () => 5) });
    expect(await createRequest(signInput, 'iphash', deps)).toEqual({ ok: false, status: 429 });
    expect(deps.insertRequest).not.toHaveBeenCalled();
    expect(deps.uploadFile).not.toHaveBeenCalled();
  });

  it('counts the rate limit from now minus one hour', async () => {
    const { deps } = fakeDeps();
    await createRequest(signInput, 'iphash', deps);
    expect(deps.countRecentByIp).toHaveBeenCalledWith('iphash', new Date(NOW.getTime() - 3600_000));
  });

  it('uploads before inserting and stores the url', async () => {
    const { deps, rows } = fakeDeps();
    await createRequest(signInput, 'iphash', deps);
    expect(deps.uploadFile).toHaveBeenCalledWith('AF-1001', preview);
    expect(rows[0].imageUrl).toBe('https://blob.example/requests/AF-1001/preview.png');
  });

  it('saves a logo request without a file', async () => {
    const { deps, rows } = fakeDeps();
    const logo: SubmitInput = {
      kind: 'logo',
      file: null,
      data: {
        customerType: 'business',
        description: 'Our cafe logo',
        size: 'md',
        quantity: 2,
        firstName: 'Ana',
        lastName: 'Ruiz',
        email: 'ana@x.com',
        promotions: false,
        smsNotifications: false,
        termsAccepted: true,
      },
    };
    await createRequest(logo, 'iphash', deps);
    expect(deps.uploadFile).not.toHaveBeenCalled();
    expect(rows[0]).toMatchObject({ type: 'logo', name: 'Ana Ruiz', notes: 'Our cafe logo', imageUrl: null, priceCents: null });
  });

  it('sends the customer confirmation and records its failure separately', async () => {
    const { deps } = fakeDeps({ confirmCustomer: vi.fn(async () => { throw new Error('bad from'); }) });
    await createRequest(signInput, 'iphash', deps);
    expect(deps.notifyOwner).toHaveBeenCalledTimes(1);
    expect(deps.setEmailError).toHaveBeenCalledWith('AF-1001', expect.stringContaining('bad from'));
  });
});
