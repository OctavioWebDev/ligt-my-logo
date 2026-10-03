import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { SESSION_COOKIE, verifySession } from './adminSession';

/** For admin server components and actions; middleware also guards /admin. */
export async function requireAdmin(): Promise<void> {
  const token = cookies().get(SESSION_COOKIE)?.value;
  if (!(await verifySession(token, Date.now(), process.env.ADMIN_SESSION_SECRET ?? ''))) redirect('/admin/login');
}
