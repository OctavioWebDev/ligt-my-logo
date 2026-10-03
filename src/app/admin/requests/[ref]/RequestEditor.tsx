'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { STATUSES, STATUS_LABELS, type Status } from '@/lib/status';
import { saveRequest } from './actions';

function Save() {
  const { pending } = useFormStatus();
  return (
    <button disabled={pending} className="rounded bg-purple-600 px-4 py-2 font-semibold text-white hover:bg-purple-700 disabled:opacity-60">
      {pending ? 'Saving…' : 'Save'}
    </button>
  );
}

export default function RequestEditor({ refId, status, adminNote }: { refId: string; status: Status; adminNote: string | null }) {
  const [state, action] = useFormState(saveRequest.bind(null, refId), null);
  return (
    <form action={action} className="space-y-3">
      <label className="block text-sm text-gray-300">
        Status
        <select name="status" defaultValue={status} className="mt-1 block rounded border border-gray-600 bg-gray-800 p-2 text-white">
          {STATUSES.map((s) => <option key={s} value={s}>{STATUS_LABELS[s]}</option>)}
        </select>
      </label>
      <label className="block text-sm text-gray-300">
        Private note
        <textarea name="adminNote" defaultValue={adminNote ?? ''} maxLength={2000} rows={4} className="mt-1 block w-full rounded border border-gray-600 bg-gray-800 p-2 text-white" />
      </label>
      <div className="flex items-center gap-3">
        <Save />
        {state?.message && <span className="text-sm text-gray-300">{state.message}</span>}
      </div>
    </form>
  );
}
