'use client';

import { useMemo, useState, type RefObject } from 'react';
import { useRouter } from 'next/navigation';
import { toBlob } from 'html-to-image';
import type { SignSpec } from '@/config/signOptions';
import { createSubmitter } from '@/lib/createSubmitter';
import type { SubmitResult } from '@/lib/submitResult';
import { submitSign, type ContactFields } from './submitSign';

type Props = { spec: SignSpec; previewRef: RefObject<HTMLDivElement>; onClose: () => void };

const input = 'mt-1 block w-full rounded border border-gray-600 bg-gray-800 p-2 text-white';

export default function RequestForm({ spec, previewRef, onClose }: Props) {
  const router = useRouter();
  const [contact, setContact] = useState<ContactFields>({ name: '', email: '', phone: '', notes: '' });
  const [honeypot, setHoneypot] = useState('');
  const [pending, setPending] = useState(false);
  const [result, setResult] = useState<Extract<SubmitResult, { ok: false }> | null>(null);

  const send = useMemo(
    () =>
      createSubmitter(async (c: ContactFields, hp: string): Promise<SubmitResult> => {
        if (!previewRef.current) return { ok: false, errors: null, message: 'Preview not ready. Please try again.' };
        const preview = await toBlob(previewRef.current, { pixelRatio: 2, cacheBust: true });
        if (!preview) return { ok: false, errors: null, message: 'Could not capture your design. Please try again.' };
        return submitSign({ contact: c, spec, preview, honeypot: hp });
      }),
    [previewRef, spec],
  );

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    const r = await send(contact, honeypot);
    if (r.ok) {
      router.push(`/request/${r.ref ?? 'received'}`);
      return;
    }
    setResult(r);
    setPending(false);
  }

  const err = (field: string) => result?.errors?.[field]?.[0] ?? result?.errors?.spec?.[0];
  const set = (k: keyof ContactFields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setContact((c) => ({ ...c, [k]: e.target.value }));

  return (
    <div role="dialog" aria-modal="true" aria-labelledby="request-title" className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <form onSubmit={onSubmit} className="w-full max-w-md space-y-3 rounded-lg bg-gray-900 p-6">
        <h2 id="request-title" className="text-xl font-bold text-white">Request this sign</h2>
        <label className="block text-sm text-gray-300">Name
          <input required value={contact.name} onChange={set('name')} className={input} autoComplete="name" />
          {result?.errors?.name && <span className="text-xs text-red-400">{result.errors.name[0]}</span>}
        </label>
        <label className="block text-sm text-gray-300">Email
          <input required type="email" value={contact.email} onChange={set('email')} className={input} autoComplete="email" />
          {result?.errors?.email && <span className="text-xs text-red-400">{result.errors.email[0]}</span>}
        </label>
        <label className="block text-sm text-gray-300">Phone (optional)
          <input type="tel" value={contact.phone} onChange={set('phone')} className={input} autoComplete="tel" maxLength={30} />
        </label>
        <label className="block text-sm text-gray-300">Notes (optional)
          <textarea value={contact.notes} onChange={set('notes')} className={input} rows={3} maxLength={500} />
        </label>
        <input
          name="company_website" value={honeypot} onChange={(e) => setHoneypot(e.target.value)}
          tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 opacity-0"
        />
        {result && <p role="alert" className="text-sm text-red-400">{err('file') && !result.errors?.name && !result.errors?.email ? err('file') : result.message}</p>}
        <div className="flex justify-end gap-3 pt-2">
          <button type="button" onClick={onClose} className="rounded px-4 py-2 text-gray-300 hover:text-white">Cancel</button>
          <button disabled={pending} className="rounded bg-purple-600 px-4 py-2 font-semibold text-white hover:bg-purple-700 disabled:opacity-60">
            {pending ? 'Sending…' : 'Send request'}
          </button>
        </div>
      </form>
    </div>
  );
}
