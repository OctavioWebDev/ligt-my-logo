import {
  Allura, Cookie, Lobster, Monoton, Pacifico, Parisienne, Playball,
  Ranchers, Righteous, Sacramento, Satisfy, Tangerine, Yellowtail,
} from 'next/font/google';
import type { Font } from './signOptions';

// Self-hosted by next/font (same origin), so html-to-image can embed them in the sign preview.
const allura = Allura({ weight: '400', subsets: ['latin'], display: 'swap' });
const cookie = Cookie({ weight: '400', subsets: ['latin'], display: 'swap' });
const lobster = Lobster({ weight: '400', subsets: ['latin'], display: 'swap' });
const monoton = Monoton({ weight: '400', subsets: ['latin'], display: 'swap' });
const pacifico = Pacifico({ weight: '400', subsets: ['latin'], display: 'swap' });
const parisienne = Parisienne({ weight: '400', subsets: ['latin'], display: 'swap' });
const playball = Playball({ weight: '400', subsets: ['latin'], display: 'swap' });
const ranchers = Ranchers({ weight: '400', subsets: ['latin'], display: 'swap' });
const righteous = Righteous({ weight: '400', subsets: ['latin'], display: 'swap' });
const sacramento = Sacramento({ weight: '400', subsets: ['latin'], display: 'swap' });
const satisfy = Satisfy({ weight: '400', subsets: ['latin'], display: 'swap' });
const tangerine = Tangerine({ weight: '400', subsets: ['latin'], display: 'swap' });
const yellowtail = Yellowtail({ weight: '400', subsets: ['latin'], display: 'swap' });

export const builderFonts: Record<Font, { className: string; style: { fontFamily: string } }> = {
  Allura: allura, Cookie: cookie, Lobster: lobster, Monoton: monoton, Pacifico: pacifico,
  Parisienne: parisienne, Playball: playball, Ranchers: ranchers, Righteous: righteous,
  Sacramento: sacramento, Satisfy: satisfy, Tangerine: tangerine, Yellowtail: yellowtail,
};
