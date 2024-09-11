import React from 'react';
import Link from 'next/link';
import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa';
import Image from 'next/image';
import SBLEDSLogo from '../../public/logo/SBLEDSLogo.png';

const MainFooter = () => {
  return (
    <footer className="flex flex-col w-full shrink-0 items-center px-4 md:px-6">
      <div className="flex flex-wrap justify-between w-full items-start gap-2 sm:gap-6 py-6 border-b border-gray-400">
        <div>
          <Image className="h-10 w-10" src={SBLEDSLogo} alt="SB LEDS Logo" width={40} height={40} />
          <p className="font-bold py-3 text-white">Scotty B's LED's</p>
          <p className="text-white">4455 Secor Road</p>
          <p className="text-white">Toledo, Ohio</p>
          <p className="text-white">Open M-F: 9:00 AM – 5:00 PM</p>
          <p className="text-white">Phone: (419)481-3567</p>
        </div>

        <div className="flex flex-wrap gap-x-12 gap-y-9 mt-6">
          <div className="w-full sm:w-1/2 md:w-1/4">
            <h5 className="text-white py-3 font-bold mb-3">Professional</h5>
            <p className="text-white">
              <Link href="/CustomLogo" className="hover:underline">
                Custom Business Logo
              </Link>
            </p>
            <p className="text-white">
              <Link href="/CustomLogo" className="hover:underline">
                Digital Sign
              </Link>
            </p>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/4">
            <h5 className="font-bold py-3 text-white mb-3">Help</h5>
            <p className="text-white">
              <Link href="/ShippingPolicy" className="hover:underline">
                Shipping Policy
              </Link>
            </p>
            <p className="text-white">
              <Link href="/ReturnsPolicy" className="hover:underline">
                Return Policy
              </Link>
            </p>
            <p className="text-white">
              <Link href="/CustomLogo" className="hover:underline">
                Contact
              </Link>
            </p>
            <p className="text-white">
              <Link href="/RefundPolicy" className="hover:underline">
                Refund Policy
              </Link>
            </p>
            <p className="text-white">
              <Link href="/PrivacyPolicy" className="hover:underline">
                Privacy Policy
              </Link>
            </p>
            <p className="text-white">
              <Link href="/TermsAndConditions" className="hover:underline">
                Terms & Conditions
              </Link>
            </p>
          </div>
        </div>
        
        <div className="md:w-1/4">
          <h5 className="font-bold py-3 text-white mb-3">Follow us</h5>
          <div className="flex justify-start space-x-4">
            <a href="https://www.facebook.com/scottybleds/" target="_blank" rel="noopener noreferrer" className="text-sm text-white">
              <FaFacebookF />
            </a>
            <a href="https://www.instagram.com/scottybsleds/" target="_blank" rel="noopener noreferrer" className="text-sm text-white">
              <FaInstagram />
            </a>
            <a href="https://www.youtube.com/watch?v=Sh6Zl7Uzm24" target="_blank" rel="noopener noreferrer" className="text-sm text-white">
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>

      <div className="text-center py-4 mt-4">
        <p className="textwhite">© 2024 Scotty B's LED's. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default MainFooter;