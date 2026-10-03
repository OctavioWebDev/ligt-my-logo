import type { Metadata } from "next";
import "./globals.css";
import { Permanent_Marker } from 'next/font/google'
import Header from "@/components/Header";
import MainFooter from "@/components/MainFooter";

const permanentMarker = Permanent_Marker({
  weight: '400',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'AuraForm | Custom LED Neon Signs',
  description: 'Design a custom LED neon sign and see the price instantly, or send us your logo for a free quote.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
    <html lang="en">
      <body className={permanentMarker.className}>
      <Header />
        {children}
      <MainFooter />
      </body>
    </html>
  );
}
