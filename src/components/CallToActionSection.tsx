import Link from 'next/link';

export default function CallToActionSection() {
  return (
    <section className="w-full bg-gray-800 py-12 md:py-24 lg:py-32 border-t">
      <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
        <div className="space-y-3">
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-transparent bg-clip-text bg-gradient-to-r from-purple-900 to-blue-700">
            Boost your brand's visibility with a striking LED sign.
          </h2>
          <p className="mx-auto max-w-[600px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            No matter your idea, we're here to bring it to LED life
          </p>
        </div>
        <div className="mx-auto w-full max-w-sm space-y-2">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Ready to Light Up Your Idea?
            <Link className="underline underline-offset-2" href="/terms">
              Terms & Conditions
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
