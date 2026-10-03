import { postRequest, type SubmitResult } from '@/lib/submitResult';

export function submitLogo(form: FormData, fetchFn: typeof fetch = fetch): Promise<SubmitResult> {
  return postRequest('/api/requests/logo', form, fetchFn);
}
