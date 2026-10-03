import { put } from '@vercel/blob';

export async function uploadRequestFile(ref: string, file: File): Promise<string> {
  const blob = await put(`requests/${ref}/${file.name}`, file, {
    access: 'public',
    addRandomSuffix: true,
    contentType: file.type,
  });
  return blob.url;
}
