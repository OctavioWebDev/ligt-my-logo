import { describe, expect, it } from 'vitest';
import { heightForWidth } from './signOptions';

describe('heightForWidth', () => {
  it('derives height from width', () => {
    expect(heightForWidth(10)).toBe(3);
    expect(heightForWidth(13)).toBe(4);
  });

  it('clamps height to 3–37 inches', () => {
    expect(heightForWidth(118)).toBe(37); // 3 + floor(108/3) = 39 → 37
    expect(heightForWidth(5)).toBe(3);
  });
});
