'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

const navItems = [
  { name: 'About', path: '/#about' },
  { name: 'Experience', path: '/#experience' },
  { name: 'Work', path: '/#work' },
  { name: 'Contact', path: '/#contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  //const [isVisible, setIsVisible] = useState(true);
  //const [lastScrollY, setLastScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('');

  /*  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < lastScrollY || currentScrollY < 10) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      } 

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);*/

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    const sections = ['home', 'about', 'experience', 'work', 'contact'];
    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <header>
      <nav
        /*        className={`fixed top-0 left-0 right-0 z-50 py-6 transition-transform duration-300 ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}*/
        className={`fixed top-0 left-0 right-0 z-1 py-6`}
      >
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex justify-center">
            <ul className="flex space-x-4 items-center bg-background/80 backdrop-blur-md border border-primary rounded-full px-4 py-4">
              <li>
                <Link href={'/'}>
                  <Image src="/logo.svg" alt="Logo" width={24} height={24} />
                </Link>
              </li>
              {navItems.map((item) => {
                const targetId = item.path.includes('#')
                  ? item.path.split('#')[1]
                  : '';
                const isActive =
                  item.path === '/'
                    ? pathname === item.path
                    : activeSection === targetId;
                return (
                  <li key={item.name}>
                    <Link
                      href={item.path}
                      className={`text-lg font-bold transition-colors hover:text-primary ${
                        isActive ? 'text-highlight' : 'text-faded'
                      }`}
                    >
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
