import { describe, expect, it } from 'vitest';
import { formatRef } from './requestStore';

describe('formatRef', () => {
  it('formats sequence numbers as AF references', () => {
    expect(formatRef(1001)).toBe('AF-1001');
    expect(formatRef(BigInt(1042))).toBe('AF-1042');
  });
});
