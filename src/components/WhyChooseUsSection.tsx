import Image from 'next/image';
import Link from 'next/link';

export default function WhyChooseUsSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gray-100 dark:bg-gray-800">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg dark:text-gray-400 bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
              Why Scotty B's LEDs?
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-purple-900 to-blue-700">Skilled Craftsmanship. Prompt Delivery.</h2>
            <p className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Our team's expertise in LED artistry guarantees that each sign is a piece of illuminated perfection. We value your time,
              ensuring swift and reliable delivery of your LED sign.
            </p>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-9 max-w-5xl mx-auto py-12">
          <Image
            alt="unclejohns"
            className="mx-auto max-h-[500px] max-w-[800px] overflow-hidden rounded-xl object-cover object-center lg:w-1/2"
            src="/ScottyBsLEDpics/245398213_1300694530390420_8635895171047700084_n.jpeg"
            width={800}
            height={500}
          />
          <div className="flex flex-col justify-center lg:w-1/2">
            <div className="flex flex-col justify-center space-y-12">
              <ul className="grid gap-8">
                {/* List items */}
              </ul>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link
                  className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                  href="/custom-logo"
                >
                  Get Started
                </Link>
                <Link
                  className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 bg-white px-8 text-sm font-medium shadow-sm text-gray-900 transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                  href="/contact"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
