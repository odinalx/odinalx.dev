'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Menu, X } from 'lucide-react';

const navItems = [
  { name: 'About', path: '/#about' },
  { name: 'Experience', path: '/#experience' },
  { name: 'Work', path: '/#work' },
  { name: 'Contact', path: '/#contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

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
    // Entrance animation for navbar - starts after loader (2.2s)
    if (navRef.current) {
      const nav = navRef.current.querySelector('nav');
      if (nav) {
        gsap.from(nav, {
          y: -100,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          delay: 2.4,
        });
      }
    }
  }, []);

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

  // Don't show navbar on /work page
  if (pathname === '/work') {
    return null;
  }

  return (
    <header ref={navRef}>
      <div
        className={`fixed top-0 left-0 right-0 z-40 pt-4 pb-2 md:py-6 lg:py-4`}
      >
        <div className="max-w-5xl mx-auto px-4">
          {/* Desktop Navigation */}
          <nav className="hidden md:flex justify-center" aria-label="Main navigation">
            <ul className="flex space-x-4 items-center bg-background/80 backdrop-blur-sm border border-primary rounded-full px-4 py-4">
              <li>
                <Link href={'/'} aria-label="Home">
                  <Image src="/logo.svg" alt="Odin Alexandre Logo" width={24} height={24} style={{ width: 'auto', height: 'auto' }} />
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
                      className={`text-base lg:text-lg font-bold transition-colors hover:text-title ${
                        isActive ? 'text-highlight' : 'text-primary'
                      }`}
                    >
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Mobile Navigation */}
          <div className="md:hidden flex justify-between items-center bg-background/80 backdrop-blur-sm border border-primary rounded-full px-4 py-3">
            <Link href={'/'} aria-label="Home">
              <Image src="/logo.svg" alt="Odin Alexandre Logo" width={24} height={24} style={{ width: 'auto', height: 'auto' }} />
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-title p-2 transition-transform duration-300 ease-in-out"
              aria-label="Toggle menu"
            >
              <div
                className={`transition-transform duration-300 ease-in-out ${
                  mobileMenuOpen ? 'rotate-90' : 'rotate-0'
                }`}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </div>
            </button>
          </div>

          {/* Mobile Menu Dropdown */}
          <nav
            className={`md:hidden absolute top-full left-4 right-4 mt-1 bg-background/95 backdrop-blur-sm border border-primary rounded-2xl overflow-hidden shadow-lg transition-all duration-300 ease-in-out origin-top ${
              mobileMenuOpen
                ? 'opacity-100 scale-y-100 translate-y-0'
                : 'opacity-0 scale-y-0 -translate-y-2 pointer-events-none'
            }`}
            aria-label="Mobile navigation menu"
          >
            <ul className="flex flex-col py-1">
              {navItems.map((item, index) => {
                const targetId = item.path.includes('#')
                  ? item.path.split('#')[1]
                  : '';
                const isActive =
                  item.path === '/'
                    ? pathname === item.path
                    : activeSection === targetId;
                return (
                  <li
                    key={item.name}
                    className={`transition-all duration-300 ease-out ${
                      mobileMenuOpen
                        ? 'opacity-100 translate-x-0'
                        : 'opacity-0 -translate-x-4'
                    }`}
                    style={{
                      transitionDelay: mobileMenuOpen
                        ? `${index * 50}ms`
                        : '0ms',
                    }}
                  >
                    <Link
                      href={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`block px-6 py-3 text-base font-bold transition-colors hover:bg-white/5 ${
                        isActive ? 'text-highlight' : 'text-primary'
                      }`}
                    >
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
