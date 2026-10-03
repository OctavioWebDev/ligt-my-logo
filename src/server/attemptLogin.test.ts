import { describe, expect, it, vi } from 'vitest';
import { attemptLogin, type LoginDeps } from './attemptLogin';

const NOW = new Date('2026-10-02T12:00:00Z');
const deps = (failures: number): LoginDeps => ({
  countRecentFailedLogins: vi.fn(async () => failures),
  recordFailedLogin: vi.fn(async () => {}),
  expectedPassword: 'hunter2',
  now: () => NOW,
});

describe('attemptLogin', () => {
  it('accepts the right password', async () => {
    expect(await attemptLogin('hunter2', 'ip', deps(0))).toBe('ok');
  });

  it('records a wrong password', async () => {
    const d = deps(0);
    expect(await attemptLogin('nope', 'ip', d)).toBe('wrong');
    expect(d.recordFailedLogin).toHaveBeenCalledWith('ip');
  });

  it('locks out after 10 failures in the last hour, even with the right password', async () => {
    const d = deps(10);
    expect(await attemptLogin('hunter2', 'ip', d)).toBe('locked');
    expect(d.countRecentFailedLogins).toHaveBeenCalledWith('ip', new Date(NOW.getTime() - 3600_000));
  });
});
