import { defaultDeps } from '@/server/defaultDeps';
import { handleSign } from '../parse';

export const runtime = 'nodejs';

export function POST(req: Request) {
  return handleSign(req, defaultDeps);
}
