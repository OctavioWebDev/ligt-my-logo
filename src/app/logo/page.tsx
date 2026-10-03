'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createSubmitter } from '@/lib/createSubmitter';
import { confirmationPath, type SubmitResult } from '@/lib/submitResult';
import { submitLogo } from './submitLogo';

const field = 'block w-full rounded-md border-2 border-gray-600 bg-gray-800/70 p-2 text-white';

export default function LogoRequestPage() {
  const router = useRouter();
  const [customerType, setCustomerType] = useState<'individual' | 'business'>('business');
  const [pending, setPending] = useState(false);
  const [result, setResult] = useState<Extract<SubmitResult, { ok: false }> | null>(null);
  const send = useMemo(() => createSubmitter((form: FormData) => submitLogo(form)), []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    const r = await send(new FormData(e.currentTarget));
    if (r.ok) {
      router.push(confirmationPath(r));
      return;
    }
    setResult(r);
    setPending(false);
  }

  const error = (name: string) =>
    result?.errors?.[name] ? <span className="text-xs text-red-400">{result.errors[name]![0]}</span> : null;

  return (
    <main className="container mx-auto mt-20 px-4 pb-16">
      <h1 className="mb-2 text-3xl font-bold text-white">Light up your logo</h1>
      <p className="mb-6 text-gray-300">Tell us about your logo and we&apos;ll send you a free quote.</p>
      <form onSubmit={onSubmit} className="space-y-4 rounded-lg bg-black/50 p-6 md:grid md:grid-cols-2 md:gap-8 md:space-y-0">
        <div className="space-y-4">
          <input type="hidden" name="customerType" value={customerType} />
          <div className="flex gap-4" role="group" aria-label="Who is this for?">
            {(['individual', 'business'] as const).map((t) => (
              <button
                key={t}
                type="button"
                aria-pressed={customerType === t}
                onClick={() => setCustomerType(t)}
                className={`rounded-md border-2 px-4 py-2 capitalize ${customerType === t ? 'border-purple-500 bg-purple-700 text-white' : 'border-gray-600 text-gray-300'}`}
              >
                {t}
              </button>
            ))}
          </div>
          <label className="block text-sm text-gray-300">
            Your logo or design (PNG, JPG, SVG or PDF, up to 4 MB)
            <input type="file" name="design" accept=".png,.jpg,.jpeg,.svg,.pdf" className={`${field} mt-1`} />
            {error('file')}
          </label>
          <label className="block text-sm text-gray-300">
            Describe your project*
            <textarea name="description" required maxLength={2000} className={`${field} mt-1 h-32`} />
            {error('description')}
          </label>
          <div className="grid grid-cols-2 gap-4">
            <label className="block text-sm text-gray-300">
              Size*
              <select name="size" required defaultValue="" className={`${field} mt-1`}>
                <option value="" disabled>Select size</option>
                <option value="sm">Small</option>
                <option value="md">Medium</option>
                <option value="lg">Large</option>
              </select>
            </label>
            <label className="block text-sm text-gray-300">
              Quantity*
              <input type="number" name="quantity" required min={1} max={1000} defaultValue={1} className={`${field} mt-1`} />
              {error('quantity')}
            </label>
          </div>
          <label className="block text-sm text-gray-300">
            When do you need it?
            <input type="date" name="deadline" className={`${field} mt-1`} />
          </label>
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <label className="block text-sm text-gray-300">First name*<input name="firstName" required maxLength={50} autoComplete="given-name" className={`${field} mt-1`} />{error('firstName')}</label>
            <label className="block text-sm text-gray-300">Last name*<input name="lastName" required maxLength={50} autoComplete="family-name" className={`${field} mt-1`} />{error('lastName')}</label>
          </div>
          <label className="block text-sm text-gray-300">Email*<input type="email" name="email" required autoComplete="email" className={`${field} mt-1`} />{error('email')}</label>
          <label className="block text-sm text-gray-300">Phone<input type="tel" name="phone" maxLength={30} autoComplete="tel" className={`${field} mt-1`} /></label>
          <label className="flex items-center gap-3 text-sm text-gray-300"><input type="checkbox" name="promotions" /> Send me occasional promotions and news.</label>
          <label className="flex items-center gap-3 text-sm text-gray-300"><input type="checkbox" name="smsNotifications" /> Text me when my quote is ready.</label>
          <label className="flex items-center gap-3 text-sm text-gray-300">
            <input type="checkbox" name="termsAccepted" required />
            <span>I agree to the <Link href="/TermsAndConditions" className="underline">Terms</Link> and <Link href="/PrivacyPolicy" className="underline">Privacy Policy</Link>*</span>
          </label>
          {error('termsAccepted')}
          <input name="company_website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 opacity-0" />
        </div>
        <div className="md:col-span-2">
          {result && <p role="alert" className="mb-3 text-sm text-red-400">{result.message}</p>}
          <button disabled={pending} className="w-full rounded-md bg-purple-600 px-4 py-2 font-bold text-white hover:bg-purple-700 disabled:opacity-60 md:w-auto">
            {pending ? 'Sending…' : 'Get a free quote'}
          </button>
        </div>
      </form>
    </main>
  );
}
