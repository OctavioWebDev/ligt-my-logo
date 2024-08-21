import Link from 'next/link';
import Image from 'next/image';
import { FaHouse, FaCartShopping, FaUser } from 'react-icons/fa6';
import SBLEDSLogo from '../../public/logo/SBLEDSLogo.png';
import HamburgerMenu from './ui/HamburgerMenu';

// Tooltip component for icon links
const IconLink = ({ href, icon: Icon, label }: { href: string; icon: React.ComponentType<React.SVGProps<SVGSVGElement>>; label: string }) => (
  <Link href={href} className="hover:underline underline-offset-4 text-purple-600 hover:text-purple-700">
    <Icon className="inline-block fill-current" />
    <span className="ml-2">{label}</span>
  </Link>
);

// Main Header component
const Header = () => {
  return (
    <header className="flex bg-slate-800 items-center justify-between px-4 fixed top-0 left-0 right-0 lg:px-6 h-14">
      <Link href="/" className="flex items-center">
        <Image src={SBLEDSLogo} alt="Scotty B's LED's Logo" width={40} height={40} />
        <span className="ml-2 text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
          Scotty B's LED's
        </span>
      </Link>
      <nav className="hidden md:flex gap-4 sm:gap-8">
        <IconLink href="/" icon={FaHouse} label="Home" />
        <Link href="/About" className="hover:underline underline-offset-4 text-purple-600 hover:text-purple-700">About Us</Link>
        <Link href="/CustomLogo" className="hover:underline underline-offset-4 text-purple-600 hover:text-purple-700">Custom Logo</Link>
        {/* <Link href="/CustomSign" className="hover:underline underline-offset-4 text-purple-600 hover:text-purple-700">Express-YourSelf</Link> */}
        <Link href="/Contact" className="hover:underline underline-offset-4 text-purple-600 hover:text-purple-700">Contact</Link>
        {/* <IconLink href="/Register" icon={FaUser} label="Register" /> */}
        {/* <IconLink href="/Cart" icon={FaCartShopping} label="Cart" /> */}
      </nav>
      <div className="md:hidden">
        <HamburgerMenu />
      </div>
    </header>
  );
};

export default Header;