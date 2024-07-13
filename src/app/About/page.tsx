import React from 'react';
import Header from '@/components/Header';
import MainFooter from '@/components/MainFooter';
import PhotoCarousel from '@/components/PhotoCarousel';
import CustomerTestimonials from '@/components/CustomerTestimonials';

function AboutUs() {
  return (
    <div className="w-full mt-10 py-6 md:py-12 lg:py-16 xl:py-20 2xl:py-28">
      <Header />
      <div className="flex-1 container mx-auto px-4 mt-16 mb-16">
        <div className="flex flex-col lg:flex-row gap-8">
          <section className="photo-carousel lg:w-1/2 order-1 lg:order-1">
            <PhotoCarousel />
          </section>
          
          <section className="about-text lg:w-1/2 order-2 lg:order-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-transparent bg-clip-text bg-gradient-to-r from-purple-900 to-blue-700 mb-8">About Us</h1>
            <p className="md:text-xl text-white">
              Scotty B's LEDs, with nearly a decade of excellence, stands at the forefront of bespoke LED signage, catering to a diverse clientele including individuals, corporate entities, and special events. Our dedication to innovation has not only established us as pioneers in custom LED signs but also as specialists in cutting-edge digital signage solutions. From vibrant company logos to captivating indoor decor, our creations are designed to illuminate and inspire.
            </p>
          </section>
        </div>
        </div>
        <div className="w-full mt-10 py-6 md:py-12 lg:py-16 xl:py-20 2xl:py-28">
        <div className="flex flex-col lg:flex-row gap-8 mt-8">
          <section className="customer-testimonials lg:w-1/2 order-2 lg:order-1 border-r">
            <h2 className="text-center text-2xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-900 to-blue-700">What Our Customers Say</h2>
            <CustomerTestimonials />
          </section>
          
          <section className="location-contact lg:w-1/2 order-1 lg:order-2">
            <h2 className="text-2xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-900 to-blue-700">Visit or Contact Us</h2>
            <p className="md:text-xl dark:text-gray-400">Discover the brilliance of Scotty B's LEDs firsthand. Our workshop and showroom are nestled in the heart of innovation, where every sign is a story waiting to be told. Reach out to us, schedule a visit, or let us answer any inquiries you might have:</p>
            <ul className="mt-4">
              <li><strong>Address:</strong> 4455 Secor Road Toledo, Ohio</li>
              <li><strong>Email:</strong> <a href="mailto:info@scottybleds.com">info@scottybleds.com</a></li>
              <li><strong>Phone:</strong> (419)481-3567</li>
            </ul>
          </section>
        </div>
        </div>
      <MainFooter />
    </div>
  );
}

export default AboutUs;
