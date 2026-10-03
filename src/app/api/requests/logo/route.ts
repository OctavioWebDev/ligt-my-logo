import { defaultDeps } from '@/server/defaultDeps';
import { handleLogo } from '../parse';

export const runtime = 'nodejs';

export function POST(req: Request) {
  return handleLogo(req, defaultDeps);
}
