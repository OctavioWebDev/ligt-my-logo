import Link from 'next/link';
import { getRequest } from '@/server/requestStore';
import { confirmationView, isRefFormat } from './confirmation';

export const dynamic = 'force-dynamic';

export default async function RequestConfirmation({ params }: { params: { ref: string } }) {
  const req = isRefFormat(params.ref) ? await getRequest(params.ref).catch(() => null) : null;
  const view = confirmationView(req, params.ref);

  return (
    <main className="mx-auto mt-28 max-w-xl space-y-4 px-4 pb-16 text-center text-white">
      <h1 className="text-3xl font-bold">{view.heading}</h1>
      {view.summary && <p className="text-gray-300">{view.summary}</p>}
      {view.price && <p className="text-xl">Price: <strong>{view.price}</strong></p>}
      <p className="text-gray-300">{view.promise}</p>
      <div className="flex justify-center gap-6 pt-4">
        <Link href="/design" className="text-purple-400 underline">Design another sign</Link>
        <Link href="/" className="text-purple-400 underline">Back home</Link>
      </div>
    </main>
  );
}
