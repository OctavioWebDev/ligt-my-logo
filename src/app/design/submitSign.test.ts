import { describe, expect, it, vi } from 'vitest';
import type { SignSpec } from '@/config/signOptions';
import { submitSign } from './submitSign';

const spec: SignSpec = {
  text: 'Open Late', font: 'Pacifico', glowColor: 'Pink', tubeColor: 'White',
  size: { width: 13, height: 4 }, backing: 'Cut to Shape', location: 'inside',
};
const preview = new Blob(['png'], { type: 'image/png' });
const input = { contact: { name: 'Ana', email: 'ana@x.com', phone: '', notes: '' }, spec, preview, honeypot: '' };
const reply = (status: number, body: unknown) => vi.fn(async () => new Response(JSON.stringify(body), { status }));

describe('submitSign', () => {
  it('posts multipart with payload JSON and preview to /api/requests/sign', async () => {
    const fetchFn = reply(200, { ref: 'AF-1001' });
    await submitSign(input, fetchFn);
    const [url, init] = fetchFn.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe('/api/requests/sign');
    expect(init.method).toBe('POST');
    const body = init.body as FormData;
    const payload = JSON.parse(String(body.get('payload')));
    expect(payload).toEqual({ name: 'Ana', email: 'ana@x.com', phone: '', notes: '', spec });
    expect(JSON.stringify(payload)).not.toContain('price');
    expect(body.get('preview')).toBeInstanceOf(Blob);
    expect(body.get('company_website')).toBe('');
  });

  it('returns ok with ref on 200', async () => {
    expect(await submitSign(input, reply(200, { ref: 'AF-1001', token: 't' }))).toEqual({ ok: true, ref: 'AF-1001', token: 't' });
  });

  it('returns field errors on 400', async () => {
    const result = await submitSign(input, reply(400, { errors: { email: ['Please enter a valid email'] } }));
    expect(result).toEqual({ ok: false, errors: { email: ['Please enter a valid email'] }, message: 'Please fix the highlighted fields.' });
  });

  it('returns a rate-limit message on 429', async () => {
    const result = await submitSign(input, reply(429, { error: 'Too many requests. Please try again later.' }));
    expect(result).toEqual({ ok: false, errors: null, message: 'Too many requests. Please try again later.' });
  });

  it('returns a friendly message when the network fails', async () => {
    const result = await submitSign(input, vi.fn(async () => { throw new TypeError('Failed to fetch'); }));
    expect(result).toEqual({ ok: false, errors: null, message: 'Something went wrong. Please try again.' });
  });
});
