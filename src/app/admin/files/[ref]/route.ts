import { requireAdmin } from '@/server/requireAdmin';
import { getRequest } from '@/server/requestStore';
import { readRequestFile } from '@/server/storage';
import { serveRequestFile } from './serveFile';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(_req: Request, { params }: { params: { ref: string } }) {
  await requireAdmin();
  return serveRequestFile(await getRequest(params.ref), readRequestFile);
}
