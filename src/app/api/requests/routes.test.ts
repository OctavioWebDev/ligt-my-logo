import { describe, expect, it, vi } from 'vitest';
import type { RequestDeps } from '@/server/createRequest';
import { handleLogo, handleSign } from './parse';

function deps(overrides: Partial<RequestDeps> = {}): RequestDeps {
  return {
    nextRef: vi.fn(async () => 'AF-1001'),
    insertRequest: vi.fn(async (row) => ({ ...row, id: 1 }) as never),
    countRecentByIp: vi.fn(async () => 0),
    setEmailError: vi.fn(async () => {}),
    uploadFile: vi.fn(async () => 'https://blob.example/x.png'),
    notifyOwner: vi.fn(async () => {}),
    confirmCustomer: vi.fn(async () => {}),
    now: () => new Date('2026-10-02T12:00:00Z'),
    newToken: () => 'tok123',
    ...overrides,
  };
}

const spec = {
  text: 'Open Late', font: 'Pacifico', glowColor: 'Pink', tubeColor: 'White',
  size: { width: 13, height: 4 }, backing: 'Cut to Shape', location: 'inside',
};

function signForm(payload: object, preview: Blob = new Blob(['png'], { type: 'image/png' }), extra: Record<string, string> = {}) {
  const fd = new FormData();
  fd.set('payload', JSON.stringify(payload));
  fd.set('preview', preview, 'preview.png');
  for (const [k, v] of Object.entries(extra)) fd.set(k, v);
  return new Request('http://localhost/api/requests/sign', { method: 'POST', body: fd });
}

function logoForm(fields: Record<string, string>, design?: Blob) {
  const fd = new FormData();
  for (const [k, v] of Object.entries(fields)) fd.set(k, v);
  if (design) fd.set('design', design, 'logo.pdf');
  return new Request('http://localhost/api/requests/logo', { method: 'POST', body: fd });
}

const logoFields = {
  customerType: 'business', description: 'Cafe logo', size: 'md', quantity: '2', deadline: '',
  firstName: 'Ana', lastName: 'Ruiz', email: 'ana@x.com', phone: '', termsAccepted: 'on',
};

describe('POST /api/requests/sign', () => {
  it('returns 200 with ref for a valid sign request', async () => {
    const res = await handleSign(signForm({ name: 'Ana', email: 'ana@x.com', spec }), deps());
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ref: 'AF-1001', token: 'tok123' });
  });

  it('returns 200 { ref: null } and saves nothing when company_website is filled', async () => {
    const d = deps();
    const res = await handleSign(signForm({ name: 'Ana', email: 'ana@x.com', spec }, undefined, { company_website: 'spam.biz' }), d);
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ref: null, token: null });
    expect(d.insertRequest).not.toHaveBeenCalled();
  });

  it('returns 400 with field errors for an invalid email', async () => {
    const res = await handleSign(signForm({ name: 'Ana', email: 'nope', spec }), deps());
    expect(res.status).toBe(400);
    expect((await res.json()).errors.email).toBeDefined();
  });

  it('returns 400 { errors: { file } } for a JPEG preview', async () => {
    const res = await handleSign(signForm({ name: 'Ana', email: 'ana@x.com', spec }, new Blob(['x'], { type: 'image/jpeg' })), deps());
    expect(res.status).toBe(400);
    expect((await res.json()).errors.file).toBeDefined();
  });

  it('returns 400 when the payload is not JSON', async () => {
    const fd = new FormData();
    fd.set('payload', '{not json');
    fd.set('preview', new Blob(['png'], { type: 'image/png' }), 'preview.png');
    const res = await handleSign(new Request('http://localhost/x', { method: 'POST', body: fd }), deps());
    expect(res.status).toBe(400);
  });

  it('returns 429 when createRequest reports the limit', async () => {
    const res = await handleSign(signForm({ name: 'Ana', email: 'ana@x.com', spec }), deps({ countRecentByIp: vi.fn(async () => 5) }));
    expect(res.status).toBe(429);
    expect(await res.json()).toEqual({ error: 'Too many requests. Please try again later.' });
  });
});

describe('POST /api/requests/logo', () => {
  it('accepts a logo request with no design file', async () => {
    const d = deps();
    const res = await handleLogo(logoForm(logoFields), d);
    expect(res.status).toBe(200);
    expect(d.uploadFile).not.toHaveBeenCalled();
  });

  it('uploads an attached PDF', async () => {
    const d = deps();
    const res = await handleLogo(logoForm(logoFields, new Blob(['%PDF'], { type: 'application/pdf' })), d);
    expect(res.status).toBe(200);
    expect(d.uploadFile).toHaveBeenCalledTimes(1);
  });

  it('returns 400 when terms are not accepted', async () => {
    const { termsAccepted: _, ...noTerms } = logoFields;
    const res = await handleLogo(logoForm(noTerms), deps());
    expect(res.status).toBe(400);
    expect((await res.json()).errors.termsAccepted).toBeDefined();
  });
});
