import type { QuoteRequest } from '@prisma/client';
import type { StoredFile } from '@/server/storage';
import { EXTENSIONS } from '@/server/storage';

const INLINE_TYPES = new Set(['image/png', 'image/jpeg']);

/** Streams a request's private file. Only PNG/JPEG render inline; anything else downloads, sandboxed. */
export async function serveRequestFile(
  req: Pick<QuoteRequest, 'ref' | 'imageUrl'> | null,
  getFile: (url: string) => Promise<StoredFile | null>,
): Promise<Response> {
  if (!req?.imageUrl) return new Response('Not found', { status: 404 });
  const file = await getFile(req.imageUrl);
  if (!file) return new Response('Not found', { status: 404 });

  const headers = new Headers({
    'content-type': file.contentType,
    'cache-control': 'private, no-store',
    'x-content-type-options': 'nosniff',
  });
  if (!INLINE_TYPES.has(file.contentType)) {
    headers.set('content-disposition', `attachment; filename="${req.ref}.${EXTENSIONS[file.contentType] ?? 'bin'}"`);
    headers.set('content-security-policy', "sandbox; default-src 'none'");
  }
  return new Response(file.stream, { headers });
}
