import Link from 'next/link';
import { siteConfig } from '@/config/site';

const STEPS = [
  { title: 'Design it', body: 'Pick your words, font, glow color and size in the sign builder and see the price instantly.' },
  { title: 'Send your request', body: 'Submit your design or upload your logo. It takes about a minute.' },
  { title: 'Get your quote', body: siteConfig.quotePromise },
];

export default function Home() {
  return (
    <main className="mt-14">
      <section className="flex min-h-[70vh] flex-col items-center justify-center gap-8 bg-gray-950 px-4 text-center">
        <h1
          className="text-5xl font-bold text-white md:text-7xl"
          style={{ textShadow: '0 0 8px #c084fc, 0 0 20px #a855f7, 0 0 40px #7c3aed' }}
        >
          {siteConfig.name}
        </h1>
        <p className="max-w-xl text-lg text-gray-300">{siteConfig.tagline}, designed by you and made to glow.</p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Link href="/design" className="rounded-md bg-purple-600 px-6 py-3 font-semibold text-white hover:bg-purple-700">Design your sign</Link>
          <Link href="/logo" className="rounded-md border border-purple-400 px-6 py-3 font-semibold text-purple-200 hover:bg-purple-900/40">Light up your logo</Link>
        </div>
      </section>
      <section className="mx-auto grid max-w-5xl gap-6 px-4 py-16 sm:grid-cols-3">
        {STEPS.map((s, i) => (
          <div key={s.title} className="rounded-lg bg-gray-900 p-6 text-gray-300">
            <p className="text-sm text-purple-400">Step {i + 1}</p>
            <h2 className="mb-2 text-xl font-semibold text-white">{s.title}</h2>
            <p>{s.body}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
