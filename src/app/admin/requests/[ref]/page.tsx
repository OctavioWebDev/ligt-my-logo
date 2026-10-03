import { Fragment } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { formatPrice, summarize } from '@/lib/format';
import { isStatus } from '@/lib/status';
import { requireAdmin } from '@/server/requireAdmin';
import { getRequest } from '@/server/requestStore';
import RequestEditor from './RequestEditor';

export const dynamic = 'force-dynamic';

export default async function RequestDetail({ params }: { params: { ref: string } }) {
  await requireAdmin();
  const req = await getRequest(params.ref);
  if (!req) notFound();

  const isImage = req.imageUrl && /\.(png|jpe?g)$/i.test(new URL(req.imageUrl).pathname);
  const fileUrl = `/admin/files/${req.ref}`;
  const details = Object.entries(req.details as Record<string, unknown>);

  return (
    <main className="mx-auto mt-20 max-w-3xl space-y-6 px-4 pb-16 text-gray-100">
      <Link href="/admin" className="text-sm text-purple-400 hover:underline">← All requests</Link>
      <h1 className="text-2xl font-bold">{req.ref} · {req.type === 'sign' ? 'Sign' : 'Logo'}</h1>
      {req.emailError && (
        <p role="alert" className="rounded border border-red-500 bg-red-950 p-3 text-sm text-red-200">
          Email problem: {req.emailError}
        </p>
      )}
      <p className="text-gray-300">{summarize(req)}</p>
      {req.imageUrl && (isImage
        ? // eslint-disable-next-line @next/next/no-img-element -- admin-only, auth-checked file route
          <img src={fileUrl} alt={`Design for ${req.ref}`} className="max-w-full rounded" />
                : <a href={fileUrl} className="text-purple-400 underline">Download uploaded file</a>)}
      <dl className="grid grid-cols-[max-content_1fr] gap-x-6 gap-y-2 text-sm">
        <dt className="text-gray-400">Name</dt><dd>{req.name}</dd>
        <dt className="text-gray-400">Email</dt><dd><a href={`mailto:${req.email}`} className="text-purple-400 underline">{req.email}</a></dd>
        <dt className="text-gray-400">Phone</dt><dd>{req.phone ?? '—'}</dd>
        <dt className="text-gray-400">Price</dt><dd>{formatPrice(req.priceCents)}</dd>
        <dt className="text-gray-400">Notes</dt><dd className="whitespace-pre-wrap">{req.notes ?? '—'}</dd>
        {details.map(([k, v]) => (
          <Fragment key={k}><dt className="text-gray-400">{k}</dt><dd className="whitespace-pre-wrap">{typeof v === 'object' && v !== null ? JSON.stringify(v) : String(v)}</dd></Fragment>
        ))}
        <dt className="text-gray-400">Received</dt><dd>{req.createdAt.toLocaleString('en-US')}</dd>
      </dl>
      <RequestEditor refId={req.ref} status={isStatus(req.status) ? req.status : 'new'} adminNote={req.adminNote} />
    </main>
  );
}
