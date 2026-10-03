export type SubmitResult =
  | { ok: true; ref: string | null }
  | { ok: false; errors: Record<string, string[]> | null; message: string };

const GENERIC = 'Something went wrong. Please try again.';

/** POSTs a form to a request endpoint and turns the response into something a form can show. */
export async function postRequest(url: string, body: FormData, fetchFn: typeof fetch): Promise<SubmitResult> {
  let res: Response;
  try {
    res = await fetchFn(url, { method: 'POST', body });
  } catch {
    return { ok: false, errors: null, message: GENERIC };
  }
  const data = await res.json().catch(() => ({}));
  if (res.ok) return { ok: true, ref: data.ref ?? null };
  if (res.status === 400 && data.errors) return { ok: false, errors: data.errors, message: 'Please fix the highlighted fields.' };
  return { ok: false, errors: null, message: typeof data.error === 'string' ? data.error : GENERIC };
}
