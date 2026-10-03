import { get, put } from '@vercel/blob';

// The Blob store is private: files are only readable with the store token,
// served to the admin through /admin/files/[ref] and attached to owner emails.

export const EXTENSIONS: Record<string, string> = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/svg+xml': 'svg',
  'application/pdf': 'pdf',
};

export async function uploadRequestFile(ref: string, file: File): Promise<string> {
  // Name by validated type, never by the client's file name.
  const ext = EXTENSIONS[file.type] ?? 'bin';
  const blob = await put(`requests/${ref}/upload.${ext}`, file, {
    access: 'private',
    addRandomSuffix: true,
    contentType: file.type,
  });
  return blob.url;
}

export type StoredFile = { stream: ReadableStream<Uint8Array>; contentType: string };

export async function readRequestFile(url: string): Promise<StoredFile | null> {
  const result = await get(url, { access: 'private' });
  if (!result || result.statusCode !== 200) return null;
  return { stream: result.stream, contentType: result.blob.contentType };
}
