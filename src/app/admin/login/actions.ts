'use server';

import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { SESSION_COOKIE, SESSION_TTL_MS, sessionCookieOptions, signSession } from '@/server/adminSession';
import { attemptLogin } from '@/server/attemptLogin';
import { clientIp, hashIp } from '@/server/ip';
import { countRecentFailedLogins, recordFailedLogin } from '@/server/requestStore';

export async function login(_prev: { error: string } | null, formData: FormData): Promise<{ error: string } | null> {
  const ipHash = hashIp(clientIp(headers()));
  const result = await attemptLogin(String(formData.get('password') ?? ''), ipHash, {
    countRecentFailedLogins,
    recordFailedLogin,
    expectedPassword: process.env.ADMIN_PASSWORD ?? '',
    now: () => new Date(),
  });
  if (result === 'locked') return { error: 'Too many attempts. Try again later.' };
  if (result === 'wrong') return { error: 'Wrong password' };

  const token = await signSession(Date.now() + SESSION_TTL_MS, process.env.ADMIN_SESSION_SECRET ?? '');
  cookies().set(SESSION_COOKIE, token, sessionCookieOptions());
  redirect('/admin');
}
