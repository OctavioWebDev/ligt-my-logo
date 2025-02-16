import Image from 'next/image';
import Link from 'next/link';

export default function WhyChooseUsSection() {
  return (
    <section className="w-full py-6 md:py-12 lg:py-16 xl:py-18 2xl:py-20">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-l text-white px-3 py-1 text-sm">
              Why Scotty B's LEDs?
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-purple-900 to-blue-700">Skilled Craftsmanship. Prompt Delivery.</h2>
            <p className="text-white max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our team's expertise in LED artistry guarantees that each sign is a piece of illuminated perfection. We value your time,
              ensuring swift and reliable delivery of your LED sign.
            </p>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-9 max-w-5xl mx-auto py-12">
          <Image
            alt="unclejohns"
            className="mx-auto w-full h-auto rounded-xl object-cover object-center lg:w-1/2 max-h-[500px]"
            src="/pictures/245360386_1300694580390415_2358286749348205804_n.jpeg"
            width={800}
            height={500}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
          />
          <div className="flex flex-col justify-center lg:w-1/2">
            <div className="flex flex-col justify-center space-y-12">
              <ul className="grid gap-8">
                <li>
                  <div className="grid gap-2">
                    <h3 className="text-xl font-bold">Tailored to Your Taste</h3>
                    <p className="text-white">
                      We specialize in creating custom designs that reflect your style and needs.
                    </p>
                  </div>
                </li>
                <li>
                  <div className="grid gap-2">
                    <h3 className="text-xl font-bold">Unmatched Quality</h3>
                    <p className="text-white ">
                      Our signs are made with top-tier materials, ensuring both beauty and longevity.
                    </p>
                  </div>
                </li>
                <li>
                  <div className="grid gap-2">
                    <h3 className="text-xl font-bold"> Eco-Friendly Efficiency</h3>
                    <p className="text-white">
                      SB's LED's are not just eye-catching; they're also energy-efficient.
                    </p>
                  </div>
                </li>
              </ul>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link
                  className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                  href="/CustomLogo"
                >
                  Get Started
                </Link>
                <Link
                  className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 bg-white px-8 text-sm font-medium shadow-sm text-gray-900 transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                  href="/CustomLogo"
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