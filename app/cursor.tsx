'use client';
import { useEffect, useRef } from 'react';

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const outlineRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const cursorDot = dotRef.current;
    const cursorOutline = outlineRef.current;
    if (!cursorDot || !cursorOutline) return;

    // Add transition class for smooth morphing
    cursorOutline.classList.add('cursor-outline-transition');

    const handleMove = (e: MouseEvent) => {
      const posX = e.clientX;
      const posY = e.clientY;

      cursorDot.style.left = `${posX}px`;
      cursorDot.style.top = `${posY}px`;

      cursorOutline.animate(
        { left: `${posX}px`, top: `${posY}px` },
        { duration: 200, fill: 'forwards' }
      );
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as Element | null;
      if (!target) return;
      const link = (target as HTMLElement).closest('a');
      if (!link) return;
      cursorOutline.classList.add('cursor-outline-active');
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as Element | null;
      if (!target) return;
      const link = (target as HTMLElement).closest('a');
      if (!link) return;

      cursorOutline.classList.remove('cursor-outline-active');
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    document.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseout', handleMouseOut, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseover', handleMouseOver as EventListener);
      document.removeEventListener('mouseout', handleMouseOut as EventListener);
    };
  }, []);

  return (
    <div className="z-[100]">
      <div
        ref={dotRef}
        className="fixed left-0 top-0 -translate-x-1/2 -translate-y-1/2 rounded-[50%] pointer-events-none w-[5px] h-[5px] bg-cursor"
      ></div>
      <div
        ref={outlineRef}
        className="fixed left-0 top-0 -translate-x-1/2 -translate-y-1/2 rounded-[50%] pointer-events-none w-[40px] h-[40px] border-2 border-cursor-outline"
      ></div>
    </div>
  );
}
