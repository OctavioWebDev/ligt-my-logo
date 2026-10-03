import type { SignSpec } from '@/config/signOptions';
import { postRequest, type SubmitResult } from '@/lib/submitResult';

export type ContactFields = { name: string; email: string; phone: string; notes: string };

export function submitSign(
  input: { contact: ContactFields; spec: SignSpec; preview: Blob; honeypot: string },
  fetchFn: typeof fetch = fetch,
): Promise<SubmitResult> {
  const body = new FormData();
  body.set('payload', JSON.stringify({ ...input.contact, spec: input.spec }));
  body.set('preview', input.preview, 'preview.png');
  body.set('company_website', input.honeypot);
  return postRequest('/api/requests/sign', body, fetchFn);
}
