import { describe, expect, it, vi } from 'vitest';
import { createSubmitter } from './createSubmitter';

describe('createSubmitter', () => {
  it('runs the function only once while a call is in flight', async () => {
    let resolve!: (v: string) => void;
    const fn = vi.fn(() => new Promise<string>((r) => (resolve = r)));
    const submit = createSubmitter(fn);
    const a = submit();
    const b = submit();
    resolve('done');
    expect(await a).toBe('done');
    expect(await b).toBe('done');
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('allows a new call after the previous one finished', async () => {
    const fn = vi.fn(async () => 'ok');
    const submit = createSubmitter(fn);
    await submit();
    await submit();
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it('allows a retry after a failure', async () => {
    const fn = vi.fn().mockRejectedValueOnce(new Error('net')).mockResolvedValueOnce('ok');
    const submit = createSubmitter(fn);
    await expect(submit()).rejects.toThrow('net');
    expect(await submit()).toBe('ok');
  });
});
