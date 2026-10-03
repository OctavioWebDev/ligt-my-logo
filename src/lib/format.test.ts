import { describe, expect, it } from 'vitest';
import { formatPrice, summarize } from './format';
import { logoReq, signReq } from '@/server/testFixtures';

describe('formatPrice', () => {
  it('formats cents as dollars', () => {
    expect(formatPrice(21960)).toBe('$219.60');
    expect(formatPrice(1800)).toBe('$18.00');
  });

  it('shows a dash when there is no price', () => {
    expect(formatPrice(null)).toBe('—');
  });
});

describe('summarize', () => {
  it('describes a sign', () => {
    expect(summarize(signReq)).toBe('"Open Late" · Pacifico · Pink · 13×4 in · Cut to Shape · inside');
  });

  it('describes a logo request', () => {
    expect(summarize(logoReq)).toBe('Logo · business · md · qty 2');
  });

  it('never includes contact details', () => {
    for (const r of [signReq, logoReq]) {
      expect(summarize(r)).not.toContain(r.email);
      expect(summarize(r)).not.toContain(r.phone!);
    }
  });
});
