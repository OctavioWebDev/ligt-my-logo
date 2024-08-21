import React from 'react';

const TermsAndConditions = () => (
    <div className="flex flex-col min-h-screen">
        
        <section className="w-full px-6 py-12 md:py-24 lg:py-32 xl:py-48 mt-10">
            <div className="space-y-4 max-w-4xl mx-auto">
        
                <h2 className="text-3xl font-bold text-center tracking-tighter sm:text-5xl xl:text-6xl/relaxed text-transparent bg-clip-text bg-gradient-to-r from-purple-900 to-blue-700">
                    Terms & Conditions
                </h2>
                    <p className="max-w-[900px] text-center md:text-xl dark:text-gray-400">
                    Welcome to Scotty B's LED's (also referred to as "SBLED(s)").
                    By using our website (https://sbleds.com) and purchasing our products, you agree to the
                    following terms and conditions (the "Terms").
                    </p>
                <h3 className="text-3xl font-bold text-center tracking-tighter sm:text-5xl xl:text-6xl/relaxed text-transparent bg-clip-text bg-gradient-to-r from-purple-900 to-blue-700">
                    Use of Our Website
                </h3>
                    <p className="max-w-[900px] text-center md:text-xl dark:text-gray-400">
                    Our website is available for your personal use.
                    By accessing it, you agree not to misuse the content or services offered. 
                    The information provided is for general guidance and purchasing our LED products.
                    </p>
            </div>
        </section>

        <section className="w-full px-6 py-12 md:py-24 lg:py-32 border-t bg-gray-800">
            <div className="space-y-4 max-w-4xl mx-auto">

                <h3 className="text-2xl font-bold text-center tracking-tighter sm:text-5xl xl:text-6xl/none text-transparent bg-clip-text bg-gradient-to-r from-purple-900 to-blue-700">
                    Purchases and Payments
                </h3>
                    <p className="max-w-[900px] text-center md:text-xl dark:text-gray-400">
                    When you buy a product from SBLED(s), you're entering into a
                    contract with us. Make sure you provide accurate payment details. We reserve the right to refuse
                    or cancel orders at our discretion.
                    </p>
                <h3 className="text-2xl font-bold text-center tracking-tighter sm:text-5xl xl:text-6xl/none text-transparent bg-clip-text bg-gradient-to-r from-purple-900 to-blue-700">
                    Product Descriptions and Availability
                </h3>
                    <p className="max-w-[900px] text-center md:text-xl dark:text-gray-400">
                    We strive to ensure that product descriptions are accurate. However, we
                    do not warrant that all details are error-free. Product availability may vary, 
                    and we reserve the right to
                    limit quantities.
                    </p>
            </div>
        </section>

        <section className="w-full px-6 py-12 md:py-24 lg:py-32 bg-transparent border-t">
            <div className="space-y-4 max-w-4xl mx-auto">

                <h3 className="text-2xl font-bold text-center tracking-tighter sm:text-5xl xl:text-6xl/none text-transparent bg-clip-text bg-gradient-to-r from-purple-900 to-blue-700">
                    Shipping and Delivery
                </h3>
                    <p className="max-w-[900px] text-center md:text-xl dark:text-gray-400">
                    SBLED(s) will dispatch your products as per the shipping options selected
                    at checkout. Delivery times are estimates and subject to change based on 
                    availability and carrier conditions.
                    </p>
                <h3 className="text-2xl font-bold text-center tracking-tighter sm:text-5xl xl:text-6xl/none text-transparent bg-clip-text bg-gradient-to-r from-purple-900 to-blue-700">
                    Returns and Refunds
                </h3>
                    <p className="max-w-[900px] text-center md:text-xl dark:text-gray-400">
                    Eligible products can be returned within 14 days of delivery for a
                    refund or exchange. Customized items are considered final sale and 
                    are not eligible for return unless defective.
                    </p>                 
                <h3 className="text-2xl font-bold text-center tracking-tighter sm:text-5xl xl:text-6xl/none text-transparent bg-clip-text bg-gradient-to-r from-purple-900 to-blue-700">
                    Privacy Policy
                </h3>
                    <p className="max-w-[900px] text-center md:text-xl dark:text-gray-400">
                    Your privacy is important to us. Please review our Privacy 
                    Policy to understand
                    how we collect and use your information.
                    </p>
            </div>
        </section>


        <section className="w-full bg-gray-800 px-6 py-12 md:py-24 lg:py-32 border-t">
            <div className="space-y-4 max-w-4xl mx-auto">

                <h3 className="text-2xl font-bold text-center tracking-tighter sm:text-5xl xl:text-6xl/none text-transparent bg-clip-text bg-gradient-to-r from-purple-900 to-blue-700">
                    Modifications to Terms
                </h3>
                    <p className="max-w-[900px] text-center md:text-xl dark:text-gray-400">
                    SBLED(s) reserves the right to modify these Terms at any time. We will post any changes
                    online and, where feasible, notify you directly.
                    </p>
                <h3 className="text-2xl font-bold text-center tracking-tighter sm:text-5xl xl:text-6xl/none text-transparent bg-clip-text bg-gradient-to-r from-purple-900 to-blue-700">
                    Governing Law and Dispute Resolution
                    </h3>
                    <p className="max-w-[900px] text-center md:text-xl dark:text-gray-400">
                    These Terms are governed by the laws of the state in which our company is registered.
                    Disputes arising under these Terms will be resolved through binding arbitration, with no 
                    option for class action lawsuits.
                    </p>
                    <p className="max-w-[900px] text-center text-gray-500 md:text-xl dark:text-gray-400">
                    If you have any questions or concerns regarding these Terms, please contact
                    us at support@sbleds.com.
                    </p>
            </div>
        </section> 
    </div>
);

export default TermsAndConditions;