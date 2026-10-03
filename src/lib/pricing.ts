import { pricing, type PricingRates } from '@/config/pricing';
import type { SignSpec } from '@/config/signOptions';

/** Sign price in USD, rounded to cents. Used by the builder and recomputed on the server. */
export function calculatePrice(
  spec: Pick<SignSpec, 'size' | 'backing' | 'location' | 'glowColor'>,
  rates: PricingRates = pricing,
): number {
  let price = spec.size.width * spec.size.height * rates.perSquareInch;
  if (spec.location === 'outside') price *= rates.outsideMultiplier;
  price += rates.backing[spec.backing];
  if (spec.glowColor === 'RGB') price += rates.rgbSurcharge;
  price = Math.max(price, rates.minimumPrice);
  return Math.round(price * 100) / 100;
}
