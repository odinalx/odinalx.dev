'use client';
import { useEffect, useRef, useState } from 'react';

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const outlineRef = useRef<HTMLDivElement | null>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Check if device supports touch or is mobile/tablet
    const checkTouchDevice = () => {
      setIsTouchDevice(
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        window.innerWidth < 1024
      );
    };

    checkTouchDevice();
    window.addEventListener('resize', checkTouchDevice);

    return () => window.removeEventListener('resize', checkTouchDevice);
  }, []);

  useEffect(() => {
    // Don't initialize cursor on touch devices
    if (isTouchDevice) return;

    const cursorDot = dotRef.current;
    const cursorOutline = outlineRef.current;
    if (!cursorDot || !cursorOutline) return;

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

    const handleMouseDown = () => {
      cursorOutline.classList.add('cursor-outline-press');
    };

    const handleMouseUp = () => {
      cursorOutline.classList.remove('cursor-outline-press');
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    document.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseout', handleMouseOut, { passive: true });
    document.addEventListener('mousedown', handleMouseDown, { passive: true });
    document.addEventListener('mouseup', handleMouseUp, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseover', handleMouseOver as EventListener);
      document.removeEventListener('mouseout', handleMouseOut as EventListener);
      document.removeEventListener('mousedown', handleMouseDown as EventListener);
      document.removeEventListener('mouseup', handleMouseUp as EventListener);
    };
  }, [isTouchDevice]);

  // Don't render cursor on touch devices
  if (isTouchDevice) return null;

  return (
    <div className="z-[9999] hidden lg:block">
      <div
        ref={dotRef}
        className="fixed left-0 top-0 -translate-x-1/2 -translate-y-1/2 rounded-[50%] pointer-events-none w-[5px] h-[5px] bg-cursor z-[9999]"
      ></div>
      <div
        ref={outlineRef}
        className="fixed left-0 top-0 -translate-x-1/2 -translate-y-1/2 rounded-[50%] pointer-events-none w-[40px] h-[40px] border-2 border-cursor-outline cursor-outline z-[9999]"
      ></div>
    </div>
  );
}
