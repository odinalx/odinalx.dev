import Navbar from './navbar';
import Footer from './footer';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Odin Alexandre - Portfolio',
  description: 'Personal Portfolio of Odin Alexandre',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter} antialiased font-sans flex  flex-col items-center"`}
      >
        {' '}
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
