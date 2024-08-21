import React from 'react';

const ReturnsPolicy = () => (
  <div className="flex flex-col min-h-screen">

    <section className="w-full px-6 py-12 md:py-24 lg:py-32 xl:py-48 mt-10">
      <div className="space-y-4 max-w-4xl mx-auto">

        <h2 className="text-3xl font-bold text-center tracking-tighter sm:text-5xl xl:text-6xl/relaxed text-transparent bg-clip-text bg-gradient-to-r from-purple-900 to-blue-700">
          Returns Policy
          </h2>
        <h3 className="font-bold text-center text-3xl text-transparent bg-clip-text bg-gradient-to-r from-purple-900 to-blue-700">
          Definitions
          </h3>
        <ul className="max-w-[900px] text-center md:text-xl dark:text-gray-400">
          <li><strong className='text-black'>Seller:</strong> Refers to Scotty B's LED's (SBLED(s)) and its successors and assigns.</li>
          <li><strong className='text-black'>Buyer:</strong> The purchaser or any person acting on behalf of and with the authority of the purchaser.</li>
          <li><strong className='text-black'>Goods:</strong> Any products supplied by the Seller to the Buyer.</li>
          <li><strong className='text-black'>Services:</strong> All services provided by the Seller to the Buyer, including advice or recommendations.</li>
          <li><strong className='text-black'>Price:</strong> The cost of the Goods as agreed between the Seller and the Buyer.</li>
        </ul>
      </div>
    </section>

    <section className="w-full px-6 py-12 md:py-24 lg:py-32 border-t bg-gray-800">
      <div className="space-y-4 max-w-4xl mx-auto">
        <h3 className="text-3xl font-bold text-center tracking-tighter sm:text-5xl xl:text-6xl/relaxed text-transparent bg-clip-text bg-gradient-to-r from-purple-900 to-blue-700">Refunds, Defects, and Return Policies</h3>

        <p className="max-w-[900px] text-center md:text-xl dark:text-gray-400"><strong className='text-black'>LED Sign:</strong> Custom Order Products are final sale, with no refunds
          or returns accepted. Damage upon arrival must be reported within 24 hours, including photographic or video evidence.
          Variations in color or slight discolourations, due to their handmade nature or digital display differences, are not considered defects.</p>
      </div>
    </section>

    <section className="w-full px-6 py-12 md:py-24 lg:py-32 bg-transparent border-t">
      <div className="space-y-4 text-sm max-w-4xl mx-auto">
        <h3 className="text-3xl font-bold text-center tracking-tighter sm:text-5xl xl:text-6xl/relaxed text-transparent bg-clip-text bg-gradient-to-r from-purple-900 to-blue-700">Process for LED Sign Returns</h3>
        <p className="max-w-[900px] text-center md:text-xl dark:text-gray-400">Non-custom LED Sign installations from our product line can be returned within 14 days of receipt, provided
          they are unopened and undamaged. Please email us at support@sbleds.com to initiate a return. Upon return inspection, a full refund will be processed.
          Feedback on the reason for your return is greatly appreciated to help us improve our products and service.</p>
      </div>
    </section>

    <section className="w-full px-6 py-12 md:py-24 lg:py-32 border-t border-b bg-gray-800">
      <div className="space-y-4 text-sm max-w-4xl mx-auto">
        <p className="max-w-[900px] text-center md:text-xl dark:text-gray-400">Regrettably, we cannot offer refunds on custom products and limited edition installations. Should you encounter
          technical issues with any of our products, please contact our customer service team for assistance.</p>
      </div>
    </section>
  </div>
);

export default ReturnsPolicy;