'use server';

import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/server/requireAdmin';
import { updateRequest } from '@/server/requestStore';
import { parseUpdate } from './parseUpdate';

export async function saveRequest(ref: string, _prev: { message: string } | null, formData: FormData): Promise<{ message: string }> {
  await requireAdmin();
  const update = parseUpdate(formData);
  if (!update) return { message: 'Invalid status or note too long' };
  await updateRequest(ref, update);
  revalidatePath('/admin');
  revalidatePath(`/admin/requests/${ref}`);
  return { message: 'Saved' };
}
