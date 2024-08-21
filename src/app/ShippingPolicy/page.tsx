import React from 'react';

const ShippingPolicy = () => (
  <div className="flex flex-col min-h-screen">


    <section className="w-full px-6 py-12 md:py-24 lg:py-32 xl:py-48 mt-10">
      <div className="space-y-4 text-sm max-w-4xl mx-auto">

        <h2 className="text-3xl font-bold text-center tracking-tighter sm:text-5xl xl:text-6xl/relaxed text-transparent bg-clip-text bg-gradient-to-r from-purple-900 to-blue-700">Shipping Policy</h2>
        <p className="max-w-[900px] md:text-xl dark:text-gray-400 text-center">At Scotty B's LED's (SBLED(s)), we are pleased to offer free shipping for all orders over $49 exclusively within the United States. Our goal is to ensure that your order reaches you safely and in a timely manner.</p>

        <h3 className="text-3xl font-bold text-center tracking-tighter sm:text-5xl xl:text-6xl/relaxed text-transparent bg-clip-text bg-gradient-to-r from-purple-900 to-blue-700">Shipping Partners</h3>
        <p className="max-w-[900px] md:text-xl dark:text-gray-400 text-center">We partner with reputable logistics providers such as DHL Express, FedEx, and UPS to handle our shipments. This allows us to offer reliable and efficient delivery services directly to your doorstep.</p>
      </div>
    </section>

    <section className="w-full px-6 py-12 md:py-24 lg:py-32 border-t bg-gray-800">
      <div className="space-y-4 text-sm max-w-4xl mx-auto">
        <h3 className="text-3xl font-bold text-center tracking-tighter sm:text-5xl xl:text-6xl/relaxed text-transparent bg-clip-text bg-gradient-to-r from-purple-900 to-blue-700">Insurance and Security</h3>
        <p className="max-w-[900px] md:text-xl dark:text-gray-400 text-center">All deliveries dispatched by SBLED(s) are insured against theft and accidental damage from dispatch until they arrive at your destination, ensuring your peace of mind.</p>
        <h3 className="text-3xl font-bold text-center tracking-tighter sm:text-5xl xl:text-6xl/relaxed text-transparent bg-clip-text bg-gradient-to-r from-purple-900 to-blue-700">Delivery Locations</h3>
        <p className="max-w-[900px] md:text-xl dark:text-gray-400 text-center">Please note, we are unable to deliver to PO boxes due to shipping restrictions. We ensure that any partial shipments incur shipping costs only once, regardless of the number of shipments required to complete your order.</p>
      </div>
    </section>

    <section className="w-full px-6 py-12 md:py-24 lg:py-32 bg-transparent border-t">
      <div className="space-y-4 text-sm max-w-4xl mx-auto">
        <h3 className="text-3xl font-bold text-center tracking-tighter sm:text-5xl xl:text-6xl/relaxed text-transparent bg-clip-text bg-gradient-to-r from-purple-900 to-blue-700">Production and Delivery Time</h3>
        <p className="max-w-[900px] md:text-xl dark:text-gray-400 text-center">Most of our orders are custom made. Typically, it takes 2 to 4 weeks from payment confirmation to produce and deliver your customized LED piece. We also offer an express delivery option for an additional charge for those who need their order sooner, which can be selected at checkout.</p>
        <h3 className="text-3xl font-bold text-center tracking-tighter sm:text-5xl xl:text-6xl/relaxed text-transparent bg-clip-text bg-gradient-to-r from-purple-900 to-blue-700">Customs and Import Taxes</h3>
        <p className="max-w-[900px] md:text-xl dark:text-gray-400 text-center">As we only ship within the United States, customers generally are not subject to customs and import taxes. However, we are not responsible for delays that may occur due to the shipping process.</p>
      </div>
    </section>

    <section className="w-full px-6 py-12 md:py-24 lg:py-32 border-t border-b bg-gray-800">
      <div className="space-y-4 text-sm max-w-4xl mx-auto">
        <h3 className="text-3xl font-bold text-center tracking-tighter sm:text-5xl xl:text-6xl/relaxed text-transparent bg-clip-text bg-gradient-to-r from-purple-900 to-blue-700">Shipping Costs</h3>
        <p className="max-w-[900px] md:text-xl dark:text-gray-400 text-center">The shipping costs mentioned apply to our LED installations ordered through the online configurator. For custom installations, shipping costs may vary depending on the size and shape of the product.</p>
        <p className="max-w-[900px] md:text-xl dark:text-gray-400 text-center">Should you have any questions about our shipping policy or your order, please don't hesitate to contact us at support@sbleds.com. We're here to help!</p>
      </div>
    </section>
  
  </div>
);

export default ShippingPolicy;