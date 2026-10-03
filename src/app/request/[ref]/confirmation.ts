import type { QuoteRequest } from '@prisma/client';
import { siteConfig } from '@/config/site';
import { formatPrice, summarize } from '@/lib/format';

export const isRefFormat = (ref: string) => /^AF-\d+$/.test(ref);

/** What the confirmation page shows. Unknown refs get a generic page so refs can't be probed. */
export function confirmationView(req: QuoteRequest | null, ref: string) {
  if (!req) return { heading: 'Request received', summary: null, price: null, promise: siteConfig.quotePromise };
  return {
    heading: `Request ${ref} received`,
    summary: summarize(req),
    price: req.priceCents === null ? null : formatPrice(req.priceCents),
    promise: siteConfig.quotePromise,
  };
}
