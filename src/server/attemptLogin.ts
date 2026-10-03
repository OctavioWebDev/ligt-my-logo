import { checkPassword, FAILED_LOGINS_PER_HOUR } from './adminSession';

export type LoginDeps = {
  countRecentFailedLogins: (ipHash: string, since: Date) => Promise<number>;
  recordFailedLogin: (ipHash: string) => Promise<void>;
  expectedPassword: string;
  now: () => Date;
};

export async function attemptLogin(password: string, ipHash: string, deps: LoginDeps): Promise<'ok' | 'wrong' | 'locked'> {
  const since = new Date(deps.now().getTime() - 3600_000);
  if ((await deps.countRecentFailedLogins(ipHash, since)) >= FAILED_LOGINS_PER_HOUR) return 'locked';
  if (await checkPassword(password, deps.expectedPassword)) return 'ok';
  await deps.recordFailedLogin(ipHash);
  return 'wrong';
}
