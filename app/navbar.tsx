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
    const sectionIds = ['home', 'about', 'experience', 'work', 'contact'];

    const handleScroll = () => {
      const viewportCenter = window.scrollY + window.innerHeight / 2;
      let closestSectionId = '';
      let smallestDistance = Number.POSITIVE_INFINITY;

      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (!element) continue;

        const rect = element.getBoundingClientRect();
        const elementCenter = window.scrollY + rect.top + rect.height / 2;
        const distanceToCenter = Math.abs(elementCenter - viewportCenter);

        if (distanceToCenter < smallestDistance) {
          smallestDistance = distanceToCenter;
          closestSectionId = id;
        }
      }

      if (closestSectionId) {
        setActiveSection(closestSectionId);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <header>
      <nav
        /*        className={`fixed top-0 left-0 right-0 z-50 py-6 transition-transform duration-300 ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}*/
        className={`fixed top-0 left-0 right-0 z-40 py-6`}
      >
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex justify-center">
            <ul className="flex space-x-4 items-center bg-background/80 backdrop-blur-sm border border-primary rounded-full px-4 py-4">
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
