import { createHash } from 'node:crypto';

/** First address in x-forwarded-for (set by Vercel), or "unknown" so local requests are still rate-limited. */
export function clientIp(headers: Headers): string {
  const first = headers.get('x-forwarded-for')?.split(',')[0]?.trim();
  return first || 'unknown';
}

export function hashIp(ip: string, secret = process.env.IP_HASH_SECRET ?? ''): string {
  return createHash('sha256').update(ip + secret).digest('hex');
}
