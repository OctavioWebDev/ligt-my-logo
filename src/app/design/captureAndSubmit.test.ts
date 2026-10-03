import { describe, expect, it, vi } from 'vitest';
import { captureAndSubmit } from './captureAndSubmit';

const node = {} as HTMLElement;

describe('captureAndSubmit', () => {
  it('returns a message instead of throwing when the capture fails', async () => {
    const submit = vi.fn();
    const result = await captureAndSubmit(node, vi.fn(async () => { throw new Error('canvas tainted'); }), submit);
    expect(result).toEqual({ ok: false, errors: null, message: 'Could not capture your design. Please try again.' });
    expect(submit).not.toHaveBeenCalled();
  });

  it('returns a message when there is no preview yet', async () => {
    const result = await captureAndSubmit(null, vi.fn(), vi.fn());
    expect(result).toEqual({ ok: false, errors: null, message: 'Preview not ready. Please try again.' });
  });

  it('submits the captured image', async () => {
    const blob = new Blob(['png'], { type: 'image/png' });
    const submit = vi.fn(async () => ({ ok: true as const, ref: 'AF-1001', token: 't' }));
    expect(await captureAndSubmit(node, vi.fn(async () => blob), submit)).toEqual({ ok: true, ref: 'AF-1001', token: 't' });
    expect(submit).toHaveBeenCalledWith(blob);
  });
});
