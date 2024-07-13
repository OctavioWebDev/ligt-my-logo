import Image from 'next/image';
import Link from 'next/link';

export default function DigitalSignsSection() {
  return (
    <section className="w-full py-12 md:py-12 lg:py-16 xl:py-20 2xl:py-28 bg-transparent">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-purple-900 to-blue-700">Transform Your Space with Dynamic Digital Signs</h2>
            <p className="max-w-[900px] text-white md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              At Scotty B's LEDs, we're not just about illuminating your world with bespoke LED creations; we're also at the forefront
              of bringing cutting-edge digital signage solutions to businesses and homes alike.
            </p>
          </div>
        </div>
        <div className="mx-auto max-w-5xl py-12">
          <div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-12">
            <div className="w-full lg:w-1/2 order-2 lg:order-1">
            <ul className="grid gap-6">
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">Versatile Solutions for Every Need</h3>
                      <p className="text-white">
                        Whether you're looking to enhance customer engagement in your retail store,
                        showcase menus in your restaurant in style, or add a modern touch to your
                        home with artful displays, our digital signs are designed to meet a wide
                        array of needs. With crisp, clear imagery and seamless video playback, our
                        digital signs ensure your message is not just seen but remembered.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">Customized to Your Specifications</h3>
                      <p className="text-white">
                        Understanding that every client has unique requirements, Scotty B's LEDs
                        specializes in custom digital signage solutions. From the drawing board to
                        installation, our team works closely with you to create digital signs that
                        reflect your brand's personality and cater to your specific objectives. Choose
                        from a variety of sizes, formats, and mounting options to fit perfectly in your designated space.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold"> Easy to Update, Effortless to Manage</h3>
                      <p className="text-white">
                        Gone are the days of static displays. Our digital signs come equipped with
                        user-friendly software that allows for easy updates in real-time. Whether
                        it's promoting a limited-time offer, sharing news, or celebrating a special
                        occasion, changing your content is just a few clicks away. This flexibility
                        ensures your digital signs remain relevant, engaging, and perfectly aligned
                        with your evolving needs.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">Energy-Efficient and Long-Lasting</h3>
                      <p className="text-white">
                        Embracing the latest in technology doesn't mean compromising on efficiency.
                        Scotty B's LEDs is committed to sustainability, offering digital signs that
                        are not only bright and beautiful but also energy-efficient and durable.
                        Enjoy the brilliance of digital signage with the peace of mind that you're
                        making an environmentally friendly choice.
                      </p>
                    </div>
                  </li>
                </ul>
              <div className="flex flex-col gap-2 min-[400px]:flex-row mt-6">
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
            <div className="w-full lg:w-1/2 order-1 lg:order-2 mb-6 lg:mb-0">
              <Image
                alt="digiSign1"
                className="mx-auto w-full h-auto rounded-xl object-cover object-center"
                src="/pictures/digisign1design.png"
                width={800}
                height={500}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


