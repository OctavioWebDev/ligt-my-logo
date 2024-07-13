import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import Header from '../components/Header';
import MainFooter from '../components/MainFooter';

const CustomBusinessLogoForm = () => {
  // Use the useState hook to manage form state
  const [formState, setFormState] = useState({
    // Initialize your form fields here
    selectedType: null, // This will track the selection of Individual or Business
  });
  const [submitStatus, setSubmitStatus] = useState({
    message: '',
    isError: false,
  });

  const handleSelection = (type) => {
    setFormState(prevState => ({ ...prevState, selectedType: type }));
  };

  // Handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    console.log(file);
    // Update form state accordingly
  };

  // Handle form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState(prevState => ({ ...prevState, [name]: value }));
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
        event.target.reset();
    }, (error) => {
        console.error('FAILED...', error.text);
        setSubmitStatus({ message: 'Failed to send request. Please try again.', isError: true });
    });
  };

  return (
    <div className="mt-16 container mx-auto px-4">
      <Header />
      <h2 className="text-2xl font-bold mb-4 text-center md:text-left text-transparent bg-clip-text bg-gradient-to-r from-purple-900 to-blue-700">GET A FREE QUOTE</h2>
      <form onSubmit={handleSubmit} className="flex flex-col bg-black bg-opacity-50 p-6 rounded-lg space-y-4 md:grid md:grid-cols-2 md:gap-8">
        {/* The left column starts here */}
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row md:gap-4">
            <button
              type="button"
              className={`border-2 px-4 py-2 rounded-md mb-4 md:mb-0 ${formState.selectedType === 'individual' ? 'bg-purple-700 text-white' : 'text-gray-400'}`}
              onClick={() => handleSelection('individual')}
            >
              Individual
            </button>
            <button
              type="button"
              className={`border-2 px-4 py-2 rounded-md ${formState.selectedType === 'business' ? 'bg-purple-700 text-white' : 'text-gray-400'}`}
              onClick={() => handleSelection('business')}
            >
              Business
            </button>
          </div>
          <input type="file" name="design" onChange={handleFileUpload} className="border-2 bg-gray-600 bg-opacity-50  p-2 rounded-md w-full" />
          <textarea name="projectDescription" onChange={handleChange} placeholder="Describe your project*" className="bg-gray-600 bg-opacity-50 border-2 p-2 rounded-md w-full h-32" required></textarea>
          <div className="flex flex-col md:flex-row md:gap-4">
            <select name="size" onChange={handleChange} className="bg-gray-600 bg-opacity-50 dark:text-gray-400 border-2 p-2 rounded-md w-full mb-4 md:mb-0" required>
              <option value="">Select Size*</option>
              <option value="sm">Small (SM)</option>
              <option value="md">Medium (MD)</option>
              <option value="lg">Large (LG)</option>
            </select>
            <select name="quantity" onChange={handleChange} className="bg-gray-600 bg-opacity-50 dark:text-gray-400 border-2 p-2 rounded-md w-full" required>
              <option value="">Select Quantity*</option>
              {[...Array(100).keys()].map((num) => (
                <option key={num + 1} value={num + 1}>
                  {num + 1}
                </option>
              ))}
            </select>
          </div>
          <input
            type="date"
            name="deadline"
            onChange={handleChange}
            className="bg-gray-600 bg-opacity-50 dark:text-gray-400 border-2 p-2 rounded-md w-full"
            required
            placeholder="When do you need it?*"
          />
        </div>
        <div className="space-y-4">
          <input type="text" name="firstName" onChange={handleChange} placeholder="First Name*" className="bg-gray-600 bg-opacity-50 border-2 p-2 rounded-md w-full" required />
          <input type="text" name="lastName" onChange={handleChange} placeholder="Last Name*" className="bg-gray-600 bg-opacity-50 border-2 p-2 rounded-md w-full" required />
          <input type="email" name="email" onChange={handleChange} placeholder="Email*" className="bg-gray-600 bg-opacity-50 border-2 p-2 rounded-md w-full" required />
          <div className="flex flex-col md:flex-row md:gap-4">
            {/* <select name="countryCode" onChange={handleChange} className="border-2 p-2 rounded-md w-full mb-4 md:mb-0 md:w-1/3" required>
              <option value="+1">+1</option>
            </select> */}
            <input type="tel" name="phone" onChange={handleChange} placeholder="Phone*" className="bg-gray-600 bg-opacity-50  border-2 p-2 rounded-md w-full md:w-2/3" required />
          </div>
          {/* <select name="country" onChange={handleChange} className="border-2 p-2 rounded-md w-full" required>
            <option value="">Select Country*</option>
          </select> */}
          <div className="flex gap-4 items-center">
            <input type="checkbox" name="promotions" id="promotions" />
            <label htmlFor="promotions" className="text-sm dark:text-gray-400">
              I'd like to receive exclusive promotions, discounts and news.
            </label>
          </div>
          <div className="flex gap-4 items-center">
            <input type="checkbox" name="smsNotifications" id="smsNotifications" />
            <label htmlFor="smsNotifications" className="text-sm dark:text-gray-400">
              I would like to be notified by SMS when my quote is ready.
            </label>
          </div>
          <div className="flex gap-4 items-center">
            <input type="checkbox" name="termsAndConditions" id="termsAndConditions" required />
            <label htmlFor="termsAndConditions" className="text-sm dark:text-gray-400">
              I agree with the Terms and Conditions and Privacy Policy*
            </label>
          </div>
        </div>
        <button type="submit" className="col-span-2 bg-purple-500 text-white font-bold py-2 px-4 rounded-md hover:bg-purple-700 w-full md:w-auto">
          GET A FREE QUOTE
        </button>
        {submitStatus.message && (
        <div className={submitStatus.isError ? 'text-red-500' : 'text-green-500'}>
          {submitStatus.message}
        </div>
      )}
      </form>
      <MainFooter />
    </div>
  );
};

export default CustomBusinessLogoForm;