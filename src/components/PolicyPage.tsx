import { siteConfig } from '@/config/site';

/** Policy layout. `todo` items are visible placeholders Octavio must replace before launch. */
export default function PolicyPage({ title, children, todo }: { title: string; children?: React.ReactNode; todo?: string[] }) {
  return (
    <main className="mx-auto mt-20 max-w-3xl space-y-4 px-4 pb-16 text-gray-300">
      <h1 className="text-3xl font-bold text-white">{title}</h1>
      {children}
      {todo?.map((t) => (
        <p key={t} className="rounded border border-amber-500 bg-amber-950/40 p-3 text-amber-200">TODO(Octavio): {t}</p>
      ))}
      <p>Questions? Email <a className="underline" href={`mailto:${siteConfig.supportEmail}`}>{siteConfig.supportEmail}</a>.</p>
    </main>
  );
}
