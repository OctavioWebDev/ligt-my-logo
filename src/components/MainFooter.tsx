import Link from 'next/link';
import { siteConfig } from '@/config/site';
import Wordmark from './Wordmark';

const HELP = [
  { href: '/ShippingPolicy', label: 'Shipping' },
  { href: '/ReturnsPolicy', label: 'Returns' },
  { href: '/RefundPolicy', label: 'Refunds' },
  { href: '/PrivacyPolicy', label: 'Privacy' },
  { href: '/TermsAndConditions', label: 'Terms' },
];

export default function MainFooter() {
  return (
    <footer className="bg-slate-900 px-6 py-10 text-gray-300">
      <div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-3">
        <div className="space-y-2">
          <Wordmark />
          <p className="text-sm">{siteConfig.tagline}</p>
          <p className="text-sm"><a href={`mailto:${siteConfig.supportEmail}`} className="hover:underline">{siteConfig.supportEmail}</a></p>
        </div>
        <div className="space-y-2 text-sm">
          <p className="font-bold text-white">Create</p>
          <p><Link href="/design" className="hover:underline">Design a sign</Link></p>
          <p><Link href="/logo" className="hover:underline">Light up your logo</Link></p>
        </div>
        <div className="space-y-2 text-sm">
          <p className="font-bold text-white">Help</p>
          {HELP.map((l) => <p key={l.href}><Link href={l.href} className="hover:underline">{l.label}</Link></p>)}
        </div>
      </div>
      <p className="mt-8 text-center text-xs text-gray-500">© {new Date().getFullYear()} {siteConfig.name}</p>
    </footer>
  );
}
