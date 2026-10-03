// Web Crypto only, so this runs in middleware (edge) as well as on the server.
export const SESSION_COOKIE = 'af_admin';
export const SESSION_TTL_MS = 7 * 24 * 3600_000;
export const FAILED_LOGINS_PER_HOUR = 10;

const encoder = new TextEncoder();

function base64url(bytes: ArrayBuffer): string {
  const arr = new Uint8Array(bytes);
  let s = '';
  for (let i = 0; i < arr.length; i++) s += String.fromCharCode(arr[i]);
  return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

async function hmac(secret: string, message: string): Promise<string> {
  const key = await crypto.subtle.importKey('raw', encoder.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  return base64url(await crypto.subtle.sign('HMAC', key, encoder.encode(message)));
}

function constantTimeEqual(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
  return diff === 0;
}

export async function signSession(expiresAt: number, secret: string): Promise<string> {
  if (!secret) throw new Error('ADMIN_SESSION_SECRET is not set');
  return `${expiresAt}.${await hmac(secret, String(expiresAt))}`;
}

export async function verifySession(token: string | undefined, now: number, secret: string): Promise<boolean> {
  if (!token || !secret) return false;
  const [exp, sig, extra] = token.split('.');
  if (!exp || !sig || extra !== undefined || !/^\d+$/.test(exp)) return false;
  if (Number(exp) <= now) return false;
  const expected = await hmac(secret, exp);
  return constantTimeEqual(encoder.encode(sig), encoder.encode(expected));
}

export async function checkPassword(input: string, expected: string): Promise<boolean> {
  if (!expected) return false;
  const [a, b] = await Promise.all([input, expected].map((s) => crypto.subtle.digest('SHA-256', encoder.encode(s))));
  return constantTimeEqual(new Uint8Array(a), new Uint8Array(b));
}

export function sessionCookieOptions() {
  return {
    httpOnly: true as const,
    sameSite: 'lax' as const,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: SESSION_TTL_MS / 1000,
  };
}
