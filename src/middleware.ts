import { NextResponse, type NextRequest } from 'next/server';
import { SESSION_COOKIE, verifySession } from '@/server/adminSession';

export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname === '/admin/login') return NextResponse.next();
  const token = req.cookies.get(SESSION_COOKIE)?.value;
  if (await verifySession(token, Date.now(), process.env.ADMIN_SESSION_SECRET ?? '')) return NextResponse.next();
  return NextResponse.redirect(new URL('/admin/login', req.url));
}

export const config = { matcher: ['/admin', '/admin/:path*'] };
