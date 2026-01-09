'use client';

import { Github, Twitter, Linkedin, Instagram, MapPin } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function SideBars() {
  const leftBarRef = useRef<HTMLDivElement>(null);
  const rightBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate left bar (socials) - after navbar finishes
    // Loader: 2.2s, Navbar: 2.4s + 0.8s = finishes at 3.2s
    if (leftBarRef.current) {
      gsap.from(leftBarRef.current, {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 3.25,
      });
    }

    // Animate right bar (based in france)
    if (rightBarRef.current) {
      gsap.from(rightBarRef.current, {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 3.35,
      });
    }
  }, []);

  return (
    <>
      {/* Left Bar - Social Icons (Hidden on mobile/tablet) */}
      <div
        ref={leftBarRef}
        className="hidden lg:block fixed bottom-0 left-20 xl:left-40 w-10 text-light-faded"
      >
        <ul className="flex flex-col items-center after:w-[1px] after:h-[120px] after:bg-light-faded after:block ">
          <li className="p-3">
            <a href="" className="hover:text-highlight">
              <Github size={24} />
            </a>
          </li>
          <li className="p-3">
            <a href="" className="hover:text-highlight">
              <Linkedin size={24} />
            </a>
          </li>
          <li className="p-3">
            <a href="" className="hover:text-highlight">
              <Twitter size={24} />
            </a>
          </li>
          <li className="p-3 mb-5">
            <a href="" className="hover:text-highlight">
              <Instagram size={24} />
            </a>
          </li>
        </ul>
      </div>

      {/* Right Bar - Based in France (Hidden on mobile/tablet) */}
      <div
        ref={rightBarRef}
        className="hidden lg:block fixed bottom-0 right-20 xl:right-40 w-10 text-light-faded"
      >
        <div className="after:w-[1px] after:h-[120px] after:bg-light-faded after:block flex flex-col items-center">
          <MapPin size={24} className="rotate-90 mb-4" />
          <p className="writing-mode-vertical-rl text-center mb-5 font-bold text-sm">
            BASED IN FRANCE
          </p>
        </div>
      </div>
    </>
  );
}
