import React from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '../components/CheckoutForm'; // Adjust the path as needed
import Header from '../components/Header';
import MainFooter from '../components/MainFooter';

const stripePromise = loadStripe('my-publishable-key-here'); // Your Stripe Publishable Key

const CheckoutPage = () => {
  const location = useLocation();
  const { cart } = location.state || { cart: [] }; // Retrieve cart from location state

  return (
    <>
      <Header />
      <div className="container mt-16 text-pink-950 mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Checkout</h2>
        <div className="flex flex-col lg:flex-row lg:space-x-6">
          <div className="lg:w-2/3">
            {cart.length === 0 ? (
              <p className="text-center text-gray-600">Your cart is empty.</p>
            ) : (
              cart.map((item, index) => (
                <div key={index} className="border border-gray-300 p-4 mb-5 rounded shadow-lg">
                  <h3 className="text-lg font-semibold mb-2">Sign Specifications</h3>
                  {item.image && <img src={item.image} alt="Sign preview" className="mb-4 w-full h-auto" />}
                  <ul className="space-y-1">
                    <li><span className="font-semibold">Text:</span> {item.textInput}</li>
                    <li><span className="font-semibold">Font:</span> {item.selectedFont}</li>
                    <li><span className="font-semibold">Color:</span> {item.selectedColor}</li>
                    <li><span className="font-semibold">Tube Color:</span> {item.tubeColor}</li>
                    <li><span className="font-semibold">Size:</span> Width: {item.size.width}, Height: {item.size.height}</li>
                    <li><span className="font-semibold">Backing:</span> {item.backingType}</li>
                    {item.customSize.width !== 0 && item.customSize.height !== 0 && (
                      <li><span className="font-semibold">Custom Size:</span> Width: {item.customSize.width}, Height: {item.customSize.height}</li>
                    )}
                    <li><span className="font-semibold">Location:</span> {item.location}</li>
                    <li><span className="font-semibold">Price:</span> ${item.cost.toFixed(2)}</li>
                  </ul>
                </div>
              ))
            )}
          </div>
          <div className="lg:w-1/3">
            <div className="bg-white p-6 rounded shadow-lg">
              <h3 className="text-lg font-semibold mb-4">Payment Information</h3>
              <Elements stripe={stripePromise}>
                <CheckoutForm amount={2000} /> {/* Adjust the amount as needed */}
              </Elements>
            </div>
          </div>
        </div>
      </div>
      <MainFooter />
    </>
  );
};

export default CheckoutPage;