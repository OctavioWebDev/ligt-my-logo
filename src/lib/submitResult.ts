export type SubmitResult =
  | { ok: true; ref: string | null; token: string | null }
  | { ok: false; errors: Record<string, string[]> | null; message: string };

import { FILE_TOO_LARGE } from './validation';

const GENERIC = 'Something went wrong. Please try again.';

/** POSTs a form to a request endpoint and turns the response into something a form can show. */
export async function postRequest(url: string, body: FormData, fetchFn: typeof fetch): Promise<SubmitResult> {
  let res: Response;
  try {
    res = await fetchFn(url, { method: 'POST', body });
  } catch {
    return { ok: false, errors: null, message: GENERIC };
  }
  if (res.status === 413) return { ok: false, errors: { file: [FILE_TOO_LARGE] }, message: FILE_TOO_LARGE };
  const data = await res.json().catch(() => ({}));
  if (res.ok) return { ok: true, ref: data.ref ?? null, token: data.token ?? null };
  if (res.status === 400 && data.errors) return { ok: false, errors: data.errors, message: 'Please fix the highlighted fields.' };
  return { ok: false, errors: null, message: typeof data.error === 'string' ? data.error : GENERIC };
}

/** Where to send the customer after a successful request. */
export function confirmationPath(r: { ref: string | null; token: string | null }): string {
  return r.ref && r.token ? `/request/${r.ref}?t=${encodeURIComponent(r.token)}` : '/request/received';
}
