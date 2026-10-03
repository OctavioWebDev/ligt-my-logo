import { describe, expect, it, vi } from 'vitest';
import { postRequest } from './submitResult';

describe('postRequest', () => {
  it('explains a 413 from the platform body limit instead of a generic error', async () => {
    const fetchFn = vi.fn(async () => new Response('Request Entity Too Large', { status: 413 }));
    expect(await postRequest('/x', new FormData(), fetchFn)).toEqual({
      ok: false, errors: { file: ['File must be 4 MB or smaller'] }, message: 'File must be 4 MB or smaller',
    });
  });

  it('returns the ref and view token on success', async () => {
    const fetchFn = vi.fn(async () => new Response(JSON.stringify({ ref: 'AF-1001', token: 'tok' }), { status: 200 }));
    expect(await postRequest('/x', new FormData(), fetchFn)).toEqual({ ok: true, ref: 'AF-1001', token: 'tok' });
  });
});
