import React from 'react';
import Link from 'next/link';
import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa';
import Image from 'next/image';
import SBLEDSLogo from '../assets/Logos/SBLEDSLogo.svg';

const MainFooter = () => {
  return (
    <footer className="flex flex-col w-full shrink-0 items-center px-4 md:px-6">
      <div className="flex flex-wrap justify-between w-full items-start gap-2 sm:gap-6 py-6 border-b border-gray-400">
        <div>
          <Image className="h-10 w-10" src={SBLEDSLogo} alt="SB LEDS Logo" width={40} height={40} />
          <p className="font-bold py-3 text-slate-800">Scotty B's LED's</p>
          <p className=" text-gray-800">4455 Secor Road</p>
          <p className=" text-gray-800">Toledo, Ohio</p>
          <p className=" text-gray-800">Open M-F: 9:00 AM – 5:00 PM</p>
          <p className=" text-gray-800">Phone: (419)481-3567</p>
        </div>

        <div className="flex flex-wrap gap-x-12 gap-y-9 mt-6">
          <div className="w-full sm:w-1/2 md:w-1/4">
            <h5 className="text-slate-800 py-3 font-bold mb-3">Professional</h5>
            <p className="text-gray-800">
              <Link href="/custom-logo">
                <a className="hover:underline">Custom Business Logo</a>
              </Link>
            </p>
            <p className="text-gray-800">
              <Link href="/custom-logo">
                <a className="hover:underline">Digital Sign</a>
              </Link>
            </p>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/4">
            <h5 className="font-bold py-3 text-slate-800 mb-3">Help</h5>
            <p className="text-gray-800">
              <Link href="/shipping">
                <a className="hover:underline">Shipping Policy</a>
              </Link>
            </p>
            <p className="text-gray-800">
              <Link href="/returns">
                <a className="hover:underline">Return Policy</a>
              </Link>
            </p>
            <p className="text-gray-800">
              <Link href="/contact">
                <a className="hover:underline">Contact</a>
              </Link>
            </p>
            <p className="text-gray-800">
              <Link href="/refund">
                <a className="hover:underline">Refund Policy</a>
              </Link>
            </p>
            <p className="text-gray-800">
              <Link href="/privacy">
                <a className="hover:underline">Privacy Policy</a>
              </Link>
            </p>
            <p className="text-gray-800">
              <Link href="/terms">
                <a className="hover:underline">Terms & Conditions</a>
              </Link>
            </p>
          </div>
        </div>
        
        <div className="md:w-1/4">
          <h5 className="font-bold py-3 text-slate-800 mb-3">Follow us</h5>
          <div className="flex justify-start space-x-4">
            <a href="https://www.facebook.com/scottybleds/" target="_blank" rel="noopener noreferrer" className="text-sm">
              <FaFacebookF />
            </a>
            <a href="https://www.instagram.com/scottybsleds/" target="_blank" rel="noopener noreferrer" className="text-sm">
              <FaInstagram />
            </a>
            <a href="https://www.youtube.com/watch?v=Sh6Zl7Uzm24" target="_blank" rel="noopener noreferrer" className="text-sm">
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>

      <div className="text-center py-4 mt-4">
        <p className=" text-gray-800">© 2024 Scotty B's LED's. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default MainFooter;