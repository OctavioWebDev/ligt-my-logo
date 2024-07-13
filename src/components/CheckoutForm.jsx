'use client';
import React, { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const CheckoutForm = ({ amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState('');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch('/api/payment/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [amount]);

  const handleChange = async (event) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : '');
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name,
          email,
          address: {
            line1: address,
          },
        },
      },
    });

    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);
    }
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          required
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          required
        />
      </div>
      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
        <input
          id="address"
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          required
        />
      </div>
      <div>
        <label htmlFor="card-element" className="block text-sm font-medium text-gray-700">Credit or Debit Card</label>
        <CardElement id="card-element" onChange={handleChange} className="mt-1 p-2 block w-full border border-gray-300 rounded-md" />
      </div>
      <button
        disabled={processing || disabled || succeeded}
        id="submit"
        className="mt-4 w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700"
      >
        <span id="button-text">
          {processing ? (
            <div className="spinner" id="spinner"></div>
          ) : (
            'Pay'
          )}
        </span>
      </button>
      {error && (
        <div className="card-error text-red-500 mt-2" role="alert">
          {error}
        </div>
      )}
      <p className={succeeded ? 'result-message' : 'result-message hidden'}>
        Payment succeeded, see the result in your
        <a href={`https://dashboard.stripe.com/test/payments`} className="text-blue-500"> Stripe dashboard.</a> 
        Refresh the page to pay again.
      </p>
    </form>
  );
};

export default CheckoutForm;