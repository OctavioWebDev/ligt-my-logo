import type { SubmitResult } from '@/lib/submitResult';

const CAPTURE_FAILED: SubmitResult = { ok: false, errors: null, message: 'Could not capture your design. Please try again.' };

/** Captures the preview and submits it. Never throws, so the form can always leave its "Sending…" state. */
export async function captureAndSubmit(
  node: HTMLElement | null,
  capture: (node: HTMLElement) => Promise<Blob | null>,
  submit: (preview: Blob) => Promise<SubmitResult>,
): Promise<SubmitResult> {
  if (!node) return { ok: false, errors: null, message: 'Preview not ready. Please try again.' };
  let preview: Blob | null;
  try {
    preview = await capture(node);
  } catch (e) {
    console.error('Preview capture failed', e);
    return CAPTURE_FAILED;
  }
  return preview ? submit(preview) : CAPTURE_FAILED;
}
