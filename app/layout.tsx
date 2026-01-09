import Navbar from './navbar';
import Footer from './footer';
import Cursor from './cursor';
import SideBars from './sidebars';
import LoaderWrapper from './loader-wrapper';
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
        className={`${inter.className} antialiased flex flex-col items-center text-primary text-lg leading-7`}
      >
        <LoaderWrapper>
          <Cursor />
          <Navbar />
          <SideBars />
          {children}
          <Footer />
        </LoaderWrapper>
      </body>
    </html>
  );
}
