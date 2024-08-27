'use client'
import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}

function Contact() {
  const [formState, setFormState] = useState<FormState>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
  });

  const [submitStatus, setSubmitStatus] = useState({
    message: '',
    isError: false,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormState(prevState => ({
      ...prevState,
      [name]: value 
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitStatus({ message: '', isError: false });

    emailjs.sendForm(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
      event.currentTarget,
      process.env.NEXT_PUBLIC_EMAILJS_USER_ID!
    )
    .then((result) => {
      console.log('SUCCESS!', result.text);
      setSubmitStatus({ message: 'Your request has been sent successfully!', isError: false });
      setFormState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: ''
      });
      event.currentTarget.reset();
    }, (error) => {
      console.error('FAILED...', error.text);
      setSubmitStatus({ message: 'Failed to send request. Please try again.', isError: true });
    });
  };

  return (
    <div className="flex flex-col min-h-screen mt-16">
      <div className="min-h-screen flex flex-col justify-center items-center px-4">
        <div className="bg-black bg-opacity-50 p-6 rounded-lg max-w-2xl w-full mb-10">
          <h2 className="text-3xl text-white font-semibold text-center mb-4">Contact Us</h2>
          <p className="mb-8 text-gray-300 text-center">We are working on the ability to add reviews and customer support to our site. If you have questions or comments please use this form, not our free quote form. Also, feel free to visit our socials and leave comments there.</p>
          
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formState.firstName}
              onChange={handleChange}
              className="bg-gray-600 bg-opacity-50 rounded p-4"
              placeholder="First Name"
              required
            />
            <input
              type="text"
              name="lastName"
              value={formState.lastName}
              onChange={handleChange}
              className="bg-gray-600 bg-opacity-50 rounded p-4"
              placeholder="Last Name"
              required
            />
            <input
              type="email"
              name="email"
              value={formState.email}
              onChange={handleChange}
              className="bg-gray-600 bg-opacity-50 rounded p-4"
              placeholder="Your email"
              required
            />
            <input
              type="tel"
              name="phone"
              value={formState.phone}
              onChange={handleChange}
              className="bg-gray-600 bg-opacity-50 rounded p-4"
              placeholder="Phone Number"
            />
            <textarea
              name="message"
              value={formState.message}
              onChange={handleChange}
              className="bg-gray-600 bg-opacity-50 rounded p-4 col-span-full"
              placeholder="Your message"
              required
            />
            <button type="submit" className="col-span-full bg-purple-600 hover:bg-purple-700 rounded text-white py-2 px-6">
              Send message
            </button>
          </form>
          
          <p className="mt-4 text-gray-300 text-xs">By submitting this form you agree to our <a href="/terms" className="text-purple-700 underline">terms and conditions</a> and our <a href="/privacy" className="text-purple-700 underline">privacy policy</a> which explains how we may collect, use and disclose your personal information including to third parties.</p>
          
          {submitStatus.message && (
            <p className={`mt-4 text-sm ${submitStatus.isError ? 'text-red-500' : 'text-green-500'}`}>
              {submitStatus.message}
            </p>
          )}
        </div>
      
        <div className="flex justify-between items-center w-full max-w-2xl mt-8">
          <div className="flex items-center">
            <span className="icon-email mr-2"></span>
            <div>
              <p className="text-sm">Email us:</p>
              <p className="text-gray-300">contact@sbleds.com</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <span className="icon-phone mr-2"></span>
            <div>
              <p className="text-sm">Call us:</p>
              <p className="text-gray-300">+1 (419)481-3567</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;