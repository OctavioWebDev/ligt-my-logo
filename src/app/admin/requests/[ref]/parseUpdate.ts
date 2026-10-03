import { isStatus, type Status } from '@/lib/status';

export const MAX_ADMIN_NOTE = 2000;

export function parseUpdate(form: FormData): { status: Status; adminNote: string | null } | null {
  const status = form.get('status');
  const note = String(form.get('adminNote') ?? '').trim();
  if (!isStatus(status) || note.length > MAX_ADMIN_NOTE) return null;
  return { status, adminNote: note || null };
}
