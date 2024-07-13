import Image from 'next/image';
import Link from 'next/link';

export default function CallToActionSection() {
  return (
    <section className="relative w-full py-12 md:py-24 lg:py-32 -z-10">
      <div className="absolute inset-0">
        <Image
          src="/pictures/121215567_1057605951365947_8207835887116876005_n.jpeg"
          alt="Background"
          fill
          style={{ objectFit: 'cover' }}
          quality={100}
        />

        <div className="absolute inset-0 bg-purple-950 bg-opacity-80"></div>
      </div>
      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-white">
              Ready to Light Up Your World?
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-200 md:text-xl dark:text-gray-400">
              Transform your space with custom LED creations. Let's bring your vision to life!
            </p>
          </div>
          <div className="space-x-4">
            <Link
              className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
              href="/custom-logo"
            >
              Get Started
            </Link>
            <Link
              className="inline-flex h-9 items-center justify-center rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
              href="/contact"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}