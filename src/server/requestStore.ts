import type { Prisma, QuoteRequest } from '@prisma/client';
import { prisma } from './db';

import type { Status } from '@/lib/status';
export { STATUSES, type Status } from '@/lib/status';
export const PAGE_SIZE = 50;

export type NewRequestRow = Omit<
  QuoteRequest,
  'id' | 'status' | 'adminNote' | 'emailError' | 'createdAt' | 'updatedAt' | 'details'
> & { details: Prisma.InputJsonValue };

export function formatRef(n: number | bigint): string {
  return `AF-${n}`;
}

export async function nextRef(): Promise<string> {
  const rows = await prisma.$queryRaw<{ nextval: bigint }[]>`SELECT nextval('quote_ref_seq')`;
  return formatRef(rows[0].nextval);
}

export function insertRequest(row: NewRequestRow): Promise<QuoteRequest> {
  return prisma.quoteRequest.create({ data: row });
}

export function countRecentByIp(ipHash: string, since: Date): Promise<number> {
  return prisma.quoteRequest.count({ where: { ipHash, createdAt: { gte: since } } });
}

export async function setEmailError(ref: string, message: string): Promise<void> {
  await prisma.quoteRequest.update({ where: { ref }, data: { emailError: message.slice(0, 500) } });
}

export function getRequest(ref: string): Promise<QuoteRequest | null> {
  return prisma.quoteRequest.findUnique({ where: { ref } });
}

export async function listRequests(opts: { status?: Status; page: number }): Promise<{ items: QuoteRequest[]; total: number }> {
  const where = opts.status ? { status: opts.status } : {};
  const [items, total] = await Promise.all([
    prisma.quoteRequest.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip: (Math.max(opts.page, 1) - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
    prisma.quoteRequest.count({ where }),
  ]);
  return { items, total };
}

export async function updateRequest(ref: string, data: { status: Status; adminNote: string | null }): Promise<void> {
  await prisma.quoteRequest.update({ where: { ref }, data });
}

export function countRecentFailedLogins(ipHash: string, since: Date): Promise<number> {
  return prisma.loginAttempt.count({ where: { ipHash, createdAt: { gte: since } } });
}

export async function recordFailedLogin(ipHash: string): Promise<void> {
  await prisma.loginAttempt.create({ data: { ipHash } });
}
