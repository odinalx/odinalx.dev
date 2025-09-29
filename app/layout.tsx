import Navbar from './navbar';
import Footer from './footer';
import Cursor from './cursor';
import { Github, Twitter, Linkedin, Instagram, MapPin } from 'lucide-react';
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
        className={`${inter} antialiased flex flex-col items-center text-primary text-xl leading-7`}
      >
        <Cursor />
        <Navbar />
        <div className="fixed bottom-0 left-40 w-10 text-light-faded">
          <ul className="flex flex-col items-center after:w-[1px] after:h-[120px] after:bg-light-faded after:block ">
            <li className="p-3">
              <a href="">
                <Github size={24} />
              </a>
            </li>
            <li className="p-3">
              <a href="">
                <Linkedin size={24} />
              </a>
            </li>
            <li className="p-3">
              <a href="">
                <Twitter size={24} />
              </a>
            </li>
            <li className="p-3 mb-5">
              <a href="">
                <Instagram size={24} />
              </a>
            </li>
          </ul>
        </div>
        <div className="fixed bottom-0 right-40 w-10 text-light-faded">
          <div className="after:w-[1px] after:h-[120px] after:bg-light-faded after:block flex flex-col items-center">
            <MapPin size={24} className="rotate-90 mb-4" />
            <p className="writing-mode-vertical-rl text-center mb-5 font-bold">
              BASED IN FRANCE
            </p>
          </div>
        </div>
        {children}
        <Footer />
      </body>
    </html>
  );
}
