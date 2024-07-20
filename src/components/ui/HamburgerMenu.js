'use client';

import { useState } from 'react';
import Link from 'next/link';

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button onClick={toggleMenu} className="flex items-center p-2 focus:outline-none focus:ring-2 focus:ring-purple-600">
        <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-purple-600 shadow-lg rounded-lg z-50">
          <Link href="/" className="block px-4 py-2 text-white hover:bg-purple-800">Home</Link>
          <Link href="/About" className="block px-4 py-2 text-white hover:bg-purple-800">About Us</Link>
          <Link href="/CustomLogo" className="block px-4 py-2 text-white hover:bg-purple-800">Custom Logo</Link>
          <Link href="/CustomSign" className="block px-4 py-2 text-white hover:bg-purple-800">Express-YourSelf</Link>
          <Link href="/Contact" className="block px-4 py-2 text-white hover:bg-purple-800">Contact</Link>
          <Link href="/Register" className="block px-4 py-2 text-white hover:bg-purple-800">Account</Link>
          <Link href="/Cart" className="block px-4 py-2 text-white hover:bg-purple-800">Cart</Link>
        </div>
      )}
    </div>
  );
};

export default HamburgerMenu;