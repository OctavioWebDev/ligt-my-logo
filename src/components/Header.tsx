import Link from 'next/link';
import { NAV_LINKS } from './navLinks';
import HamburgerMenu from './ui/HamburgerMenu';
import Wordmark from './Wordmark';

export default function Header() {
  return (
    <header className="fixed left-0 right-0 top-0 z-30 flex h-14 items-center justify-between bg-slate-800 px-4 lg:px-6">
      <Link href="/" aria-label="AuraForm home"><Wordmark /></Link>
      <nav className="hidden gap-8 md:flex">
        {NAV_LINKS.map((l) => (
          <Link key={l.href} href={l.href} className="text-purple-400 underline-offset-4 hover:text-purple-300 hover:underline">{l.label}</Link>
        ))}
      </nav>
      <div className="md:hidden"><HamburgerMenu /></div>
    </header>
  );
}
