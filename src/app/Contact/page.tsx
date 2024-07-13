import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import Header from '../components/Header';
import MainFooter from '../components/MainFooter';

function Contact() {
  
    // Use the useState hook to manage form state
    const [formState, setFormState] = useState({
      // Initialize your form fields here
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
  
    // Handle form input changes
    const handleChange = (event) => {
      const { name, value } = event.target;
      setFormState(prevState => ({
         ...prevState, [name]: value 
        }));
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      setSubmitStatus({ message: '', isError: false }); // Reset status messages
  
      emailjs.sendForm(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        event.target,
        process.env.REACT_APP_EMAILJS_USER_ID
      )
      .then((result) => {
          console.log('SUCCESS!', result.text);
          setSubmitStatus({ message: 'Your request has been sent successfully!', isError: false });
          // Optionally clear the form here if needed
          setFormState({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            message: ''
          });

          event.target.reset();
      }, (error) => {
          console.error('FAILED...', error.text);
          setSubmitStatus({ message: 'Failed to send request. Please try again.', isError: true });
      });
    };

    return (
      <div className="flex flex-col min-h-screen mt-16">
        <Header />
      <div className="min-h-screen flex flex-col justify-center items-center px-4">
      <div className="bg-black bg-opacity-50 p-6 rounded-lg max-w-2xl w-full mb-10">
        <h2 className="text-3xl text-white font-semibold text-center mb-4">Contact Us</h2>
        <p className="mb-8 text-gray-300 text-center">We are working on the ability to add reviews and customer support to our site. If you have a questions or a comment please use this form not our free quote form. Also, feel free to viste our socials and leave comments there.</p>
        
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formState.firstName}
              onChange={handleChange}
              className="bg-gray-600 bg-opacity-50 rounded p-4"
              placeholder="First Name"
            />
            <input
              type="text"
              name="lastName"
              value={formState.lastName}
              onChange={handleChange}
              className="bg-gray-600 bg-opacity-50 rounded p-4"
              placeholder="Last Name"
            />
            <input
              type="email"
              name="email"
              value={formState.email}
              onChange={handleChange}
              className="bg-gray-600 bg-opacity-50 rounded p-4"
              placeholder="Your email"
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
            />
            <button type="submit" className="col-span-full bg-purple-600 hover:bg-purple-700 rounded text-white py-2 px-6">
              Send message
            </button>
          </form>
        
        <p className="mt-4 text-gray-300 text-xs">By submitting this form you agree to our <a href="http://localhost:3000/terms" className="text-purple-700 underline">terms and conditions</a> and our <a href="http://localhost:3000/privacy" className="text-purple-700 underline">privacy policy</a> which explains how we may collect, use and disclose your personal information including to third parties.</p>
        
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
      <MainFooter />
    </div>
    </div>
    
  );
}

export default Contact;