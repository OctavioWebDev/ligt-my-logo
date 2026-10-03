import Link from 'next/link';
import { formatPrice } from '@/lib/format';
import { isStatus, STATUSES, STATUS_LABELS } from '@/lib/status';
import { requireAdmin } from '@/server/requireAdmin';
import { listRequests, PAGE_SIZE } from '@/server/requestStore';

export const dynamic = 'force-dynamic';

export default async function AdminList({ searchParams }: { searchParams: { status?: string; page?: string } }) {
  await requireAdmin();
  const status = isStatus(searchParams.status) ? searchParams.status : undefined;
  const page = Math.max(1, Number.parseInt(searchParams.page ?? '1', 10) || 1);
  const { items, total } = await listRequests({ status, page });
  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const href = (p: number, s = status) => `/admin?${new URLSearchParams({ ...(s ? { status: s } : {}), page: String(p) })}`;

  return (
    <main className="mx-auto mt-20 max-w-5xl px-4 pb-16 text-gray-100">
      <h1 className="mb-4 text-2xl font-bold">Quote requests</h1>
      <nav className="mb-4 flex gap-3 text-sm">
        <Link href="/admin" className={!status ? 'font-bold text-white' : 'text-purple-400'}>All</Link>
        {STATUSES.map((s) => (
          <Link key={s} href={href(1, s)} className={status === s ? 'font-bold text-white' : 'text-purple-400'}>{STATUS_LABELS[s]}</Link>
        ))}
      </nav>
      {items.length === 0 ? (
        <p className="text-gray-400">No requests yet.</p>
      ) : (
        <table className="w-full text-left text-sm">
          <thead className="text-gray-400">
            <tr><th className="py-2">Ref</th><th>Type</th><th>Name</th><th>Price</th><th>Received</th><th>Status</th></tr>
          </thead>
          <tbody>
            {items.map((r) => (
              <tr key={r.ref} className="border-t border-gray-700">
                <td className="py-2"><Link href={`/admin/requests/${r.ref}`} className="text-purple-400 underline">{r.ref}</Link></td>
                <td>{r.type}</td>
                <td>{r.name}</td>
                <td>{formatPrice(r.priceCents)}</td>
                <td>{r.createdAt.toLocaleDateString('en-US')}</td>
                <td>{isStatus(r.status) ? STATUS_LABELS[r.status] : r.status}{r.emailError ? ' ⚠️' : ''}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {pages > 1 && (
        <div className="mt-4 flex gap-4 text-sm">
          {page > 1 && <Link href={href(page - 1)} className="text-purple-400">← Newer</Link>}
          <span className="text-gray-400">Page {page} of {pages}</span>
          {page < pages && <Link href={href(page + 1)} className="text-purple-400">Older →</Link>}
        </div>
      )}
    </main>
  );
}
