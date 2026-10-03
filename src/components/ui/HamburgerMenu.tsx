'use client';

import { useState } from 'react';
import Link from 'next/link';
import { NAV_LINKS } from '../navLinks';

export default function HamburgerMenu() {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-label="Menu" className="flex items-center p-2 focus:outline-none focus:ring-2 focus:ring-purple-600">
        <svg className="h-6 w-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      {open && (
        <div className="absolute right-0 z-50 mt-2 w-48 rounded-lg bg-purple-700 shadow-lg">
          {NAV_LINKS.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="block px-4 py-2 text-white hover:bg-purple-800">{l.label}</Link>
          ))}
        </div>
      )}
    </div>
  );
}
