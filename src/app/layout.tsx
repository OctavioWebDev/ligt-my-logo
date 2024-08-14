import type { Metadata } from "next";
import "./globals.css";
import { Permanent_Marker } from 'next/font/google'


const permanentMarker = Permanent_Marker({
  weight: '400',
  subsets: ['latin'],
})


export const metadata: Metadata = {
  title: "Scotty B's LEDs",
  description: "Scotty B's LEDs is your one stop shop for all your digital and LED signage needs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={permanentMarker.className}>
        {children}
      </body>
    </html>
  );
}
