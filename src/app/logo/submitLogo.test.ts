import { describe, expect, it, vi } from 'vitest';
import { submitLogo } from './submitLogo';

const reply = (status: number, body: unknown) => vi.fn(async () => new Response(JSON.stringify(body), { status }));

describe('submitLogo', () => {
  it('posts the FormData as-is to /api/requests/logo', async () => {
    const form = new FormData();
    form.set('firstName', 'Ana');
    const fetchFn = reply(200, { ref: 'AF-1002' });
    await submitLogo(form, fetchFn);
    const [url, init] = fetchFn.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe('/api/requests/logo');
    expect(init.body).toBe(form);
  });

  it('returns field errors on 400', async () => {
    const result = await submitLogo(new FormData(), reply(400, { errors: { termsAccepted: ['Please accept the terms'] } }));
    expect(result).toMatchObject({ ok: false, errors: { termsAccepted: ['Please accept the terms'] } });
  });

  it('returns ok with ref on 200', async () => {
    expect(await submitLogo(new FormData(), reply(200, { ref: 'AF-1002' }))).toEqual({ ok: true, ref: 'AF-1002' });
  });
});
