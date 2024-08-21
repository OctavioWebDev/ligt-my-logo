import React from 'react';

const RefundPolicy = () => (
  <div className="flex flex-col min-h-screen">
    <section className="w-full px-6 py-12 md:py-24 lg:py-32 xl:py-48 mt-10">
      <div className="space-y-4 max-w-4xl mx-auto">

        <h2 className="text-3xl font-bold text-center tracking-tighter sm:text-5xl xl:text-6xl/relaxed text-transparent bg-clip-text bg-gradient-to-r from-purple-900 to-blue-700">
          Refund Policy
        </h2>
        <p className="max-w-[900px] text-center md:text-xl dark:text-gray-400">
          At Scotty B's LED's (SBLED(s)), we take pride in
          the quality and craftsmanship of our products. Our refund policy
          outlines conditions under which refunds may or may not be granted.
        </p>
      </div>
    </section>

    <section className="w-full px-6 py-12 md:py-24 lg:py-32 border-t bg-gray-800">
      <div className="space-y-4 max-w-4xl mx-auto">
        <h3 className="text-3xl font-bold text-center tracking-tighter sm:text-5xl xl:text-6xl/relaxed text-transparent bg-clip-text bg-gradient-to-r from-purple-900 to-blue-700">
          Custom Order Products
        </h3>
        <p className="max-w-[900px] text-center md:text-xl dark:text-gray-400">
          Due to the custom nature of many of our products,
          we are unable to offer refunds or accept returns for
          Custom Order Products once an order is placed. Buyers have a
          window of 4 hours post-purchase to request modifications to custom orders.
        </p>
      </div>
    </section>

    <section className="w-full px-6 py-12 md:py-24 lg:py-32 bg-transparent border-t">
      <div className="space-y-4 max-w-4xl mx-auto">
        <h3 className="text-3xl font-bold text-center tracking-tighter sm:text-5xl xl:text-6xl/relaxed text-transparent bg-clip-text bg-gradient-to-r from-purple-900 to-blue-700">
          Damaged Goods
        </h3>
        <p className="max-w-[900px] text-center md:text-xl dark:text-gray-400">
          If Goods arrive damaged, the Buyer is required
          to notify both the delivery agent and SBLED(s) within
          24 hours of receipt, providing written evidence of the damage
          (photographs or video). Failure to report within this timeframe may
          result in the forfeiture of any claim for said damage.
        </p>

        <h3 className="text-3xl font-bold text-center tracking-tighter sm:text-5xl xl:text-6xl/relaxed text-transparent bg-clip-text bg-gradient-to-r from-purple-900 to-blue-700">Product Variations</h3>
        <p className="max-w-[900px] text-center md:text-xl dark:text-gray-400">
          Given the handcrafted nature of our products, slight variations and
          discolourations may occur. These are not considered faults. Variations
          in colour due to screen and printer calibration are also acknowledged by
          the Buyer as part of the product's unique characteristics.
        </p>
      </div>
    </section>

    <section className="w-full px-6 py-12 md:py-24 lg:py-32 border-t border-b bg-gray-800">
      <div className="space-y-4 max-w-4xl mx-auto">
        <h3 className="text-3xl font-bold text-center tracking-tighter sm:text-5xl xl:text-6xl/relaxed text-transparent bg-clip-text bg-gradient-to-r from-purple-900 to-blue-700">Inspection and Reporting</h3>
        <p className="max-w-[900px] text-center md:text-xl dark:text-gray-400">
          Upon delivery, the Buyer should inspect the Goods and report any defects,
          damage, or discrepancies within 48 hours. Failure to do so will be deemed as
          acceptance of the Goods as is, meeting all standards of quality and specification.
        </p>
        <p className="max-w-[900px] text-center md:text-xl dark:text-gray-400">
          Custom products and limited edition installations are considered final sale
          and are not eligible for refunds. We are committed to resolving technical issues
          efficiently - please reach out to our customer service team for assistance.
        </p>
        <p className="max-w-[900px] text-center md:text-xl dark:text-gray-400">
          For further inquiries or assistance, our customer service team can be contacted
          at support@sbleds.com.
        </p>
      </div>
    </section>
  </div>
);

export default RefundPolicy;