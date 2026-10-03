import { describe, expect, it } from 'vitest';
import { calculatePrice } from './pricing';
import { pricing } from '@/config/pricing';

const base = { backing: 'Full Board', location: 'inside', glowColor: 'Red' } as const;

describe('calculatePrice', () => {
  it('prices preset sizes by square inch', () => {
    expect(calculatePrice({ ...base, size: { width: 10, height: 3 } })).toBe(18);
    expect(calculatePrice({ ...base, size: { width: 21, height: 6 } })).toBe(75.6);
  });

  it('adds 10% for outside signs', () => {
    expect(calculatePrice({ ...base, location: 'outside', size: { width: 10, height: 3 } })).toBe(19.8);
    expect(calculatePrice({ ...base, location: 'outside', size: { width: 21, height: 6 } })).toBe(83.16);
  });

  it('prices the largest custom size', () => {
    expect(calculatePrice({ ...base, size: { width: 118, height: 37 } })).toBe(2619.6);
  });

  it('adds backing and RGB surcharges from the rate table', () => {
    const rates = { ...pricing, backing: { ...pricing.backing, Stand: 25 }, rgbSurcharge: 15, minimumPrice: 50 };
    expect(calculatePrice({ ...base, backing: 'Stand', glowColor: 'RGB', size: { width: 10, height: 3 } }, rates)).toBe(58);
  });

  it('never goes below the minimum price', () => {
    const rates = { ...pricing, minimumPrice: 50 };
    expect(calculatePrice({ ...base, size: { width: 10, height: 3 } }, rates)).toBe(50);
  });

  it('rounds to cents without float drift', () => {
    expect(calculatePrice({ ...base, size: { width: 11, height: 3 } })).toBe(19.8);
  });
});
