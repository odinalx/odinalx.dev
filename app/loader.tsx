'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export default function Loader({ onLoadComplete }: { onLoadComplete: () => void }) {
  const loaderRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const paths = svgRef.current?.querySelectorAll('.logo-path');
    if (!paths) return;
    
    // Set initial state - prepare for drawing animation
    gsap.set(paths, {
      strokeDasharray: function(index, target) {
        const length = (target as SVGPathElement).getTotalLength();
        return `${length} ${length}`;
      },
      strokeDashoffset: function(index, target) {
        return (target as SVGPathElement).getTotalLength();
      },
      visibility: 'visible', // Make visible now that strokeDashoffset hides the stroke
    });

    // Timeline for logo animation
    const tl = gsap.timeline({
      onComplete: () => {
        // Fade out loader after animation completes
        gsap.to(loaderRef.current, {
          opacity: 0,
          duration: 0.4,
          ease: 'power2.inOut',
          onComplete: () => {
            setIsComplete(true);
            onLoadComplete();
          },
        });
      },
    });

    // Animate the paths drawing - start immediately with longer duration
    tl.to(paths, {
      strokeDashoffset: 0,
      duration: 1.8,
      ease: 'power2.inOut',
      stagger: 0.15,
      delay: 0,
    });

  }, [onLoadComplete]);

  if (isComplete) return null;

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0a0a]"
    >
      <svg
        ref={svgRef}
        className="w-32 h-32"
        viewBox="0 0 33.77 24.22"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <style>
            {`
              .logo-path {
                fill: none;
                stroke: #d83949;
                stroke-width: 0.5;
                stroke-linecap: round;
                stroke-linejoin: round;
                visibility: hidden;
              }
            `}
          </style>
        </defs>
        <path
          className="logo-path"
          d="M25.89.8l-6.17.02-.62,1.82h0c.9.8,1.66,1.78,2.28,2.92.34.62.61,1.3.83,2.02h0s.61-1.6.61-1.6l2.89,8.54h-8.9c-.12.66-.3,1.26-.54,1.81-.34.78-.78,1.44-1.31,1.96h6.6s0,0,0,0h4.86l2.21,5.12,5.13-.02L25.89.8Z"
        />
        <path
          className="logo-path"
          d="M13.98,19.06c-.85.5-1.83.76-2.94.76-1.21,0-2.26-.3-3.15-.89s-1.59-1.46-2.09-2.6c-.5-1.14-.74-2.55-.74-4.21s.25-3.07.74-4.21c.5-1.14,1.19-2.01,2.09-2.6s1.95-.89,3.15-.89,2.26.3,3.15.89c.9.59,1.59,1.46,2.09,2.6.5,1.14.74,2.55.74,4.21,0,.58-.03,1.13-.1,1.65h5.07c.05-.53.08-1.08.08-1.65,0-2.57-.49-4.76-1.46-6.56-.97-1.8-2.29-3.18-3.96-4.13-1.67-.95-3.54-1.42-5.62-1.42s-3.98.47-5.64,1.42c-1.67.95-2.98,2.32-3.95,4.13-.97,1.8-1.45,3.99-1.45,6.56s.48,4.75,1.45,6.55c.97,1.8,2.28,3.18,3.95,4.13,1.67.95,3.55,1.43,5.64,1.43s3.95-.47,5.62-1.42c1.55-.88,2.79-2.13,3.74-3.74h-6.42Z"
        />
        <polygon
          className="logo-path"
          points="14.97 18.3 20.81 18.3 20.82 18.29 14.98 18.29 14.97 18.3"
        />
      </svg>
    </div>
  );
}
