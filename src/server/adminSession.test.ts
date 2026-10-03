import { afterEach, describe, expect, it, vi } from 'vitest';
import { checkPassword, sessionCookieOptions, signSession, verifySession } from './adminSession';

afterEach(() => vi.unstubAllEnvs());

describe('admin session tokens', () => {
  it('accepts a fresh token signed with the same secret', async () => {
    const t = await signSession(Date.now() + 1000, 's');
    expect(await verifySession(t, Date.now(), 's')).toBe(true);
  });

  it('rejects an expired token', async () => {
    const t = await signSession(Date.now() + 1000, 's');
    expect(await verifySession(t, Date.now() + 2000, 's')).toBe(false);
  });

  it('rejects a tampered token', async () => {
    const t = await signSession(Date.now() + 1000, 's');
    const last = t.at(-1) === 'x' ? 'y' : 'x';
    expect(await verifySession(t.slice(0, -1) + last, Date.now(), 's')).toBe(false);
  });

  it('rejects a token with a changed expiry', async () => {
    const t = await signSession(Date.now() + 1000, 's');
    const [, sig] = t.split('.');
    expect(await verifySession(`${Date.now() + 999_999}.${sig}`, Date.now(), 's')).toBe(false);
  });

  it('rejects a token signed with another secret, or no token', async () => {
    const t = await signSession(Date.now() + 1000, 's');
    expect(await verifySession(t, Date.now(), 'other')).toBe(false);
    expect(await verifySession(undefined, Date.now(), 's')).toBe(false);
    expect(await verifySession('garbage', Date.now(), 's')).toBe(false);
  });

  it('refuses to sign or verify without a secret', async () => {
    await expect(signSession(Date.now() + 1000, '')).rejects.toThrow('ADMIN_SESSION_SECRET');
    expect(await verifySession(`${Date.now() + 1000}.abc`, Date.now(), '')).toBe(false);
  });
});

describe('checkPassword', () => {
  it('matches only the exact password', async () => {
    expect(await checkPassword('hunter2', 'hunter2')).toBe(true);
    expect(await checkPassword('hunter3', 'hunter2')).toBe(false);
  });

  it('never matches when no password is configured', async () => {
    expect(await checkPassword('', '')).toBe(false);
  });
});

describe('sessionCookieOptions', () => {
  it('is only Secure in production so local http login works', () => {
    vi.stubEnv('NODE_ENV', 'development');
    expect(sessionCookieOptions().secure).toBe(false);
    vi.stubEnv('NODE_ENV', 'production');
    expect(sessionCookieOptions().secure).toBe(true);
  });

  it('is httpOnly and lasts 7 days', () => {
    expect(sessionCookieOptions()).toMatchObject({ httpOnly: true, sameSite: 'lax', path: '/', maxAge: 7 * 24 * 3600 });
  });
});
