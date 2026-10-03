import type { QuoteRequest } from '@prisma/client';
import type { SignSpec } from '@/config/signOptions';

export function formatPrice(cents: number | null): string {
  return cents === null ? '—' : `$${(cents / 100).toFixed(2)}`;
}

type LogoDetails = { customerType: string; size: string; quantity: number };

/** One-line description of a request. Never includes contact details. */
export function summarize(req: Pick<QuoteRequest, 'type' | 'details'>): string {
  if (req.type === 'sign') {
    const s = req.details as unknown as SignSpec;
    const text = s.text.replace(/\n/g, ' / ');
    return `"${text}" · ${s.font} · ${s.glowColor} · ${s.size.width}×${s.size.height} in · ${s.backing} · ${s.location}`;
  }
  const d = req.details as unknown as LogoDetails;
  return `Logo · ${d.customerType} · ${d.size} · qty ${d.quantity}`;
}
