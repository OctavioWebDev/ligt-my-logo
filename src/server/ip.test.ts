import { describe, expect, it } from 'vitest';
import { clientIp, hashIp } from './ip';

describe('clientIp', () => {
  it('uses the first x-forwarded-for entry', () => {
    expect(clientIp(new Headers({ 'x-forwarded-for': '1.2.3.4, 10.0.0.1' }))).toBe('1.2.3.4');
  });

  it('falls back to "unknown" when there is no forwarded header', () => {
    expect(clientIp(new Headers())).toBe('unknown');
  });
});

describe('hashIp', () => {
  it('returns a sha256 hex digest that depends on the secret', () => {
    expect(hashIp('unknown', 's')).toMatch(/^[0-9a-f]{64}$/);
    expect(hashIp('1.2.3.4', 'a')).not.toBe(hashIp('1.2.3.4', 'b'));
  });
});
