'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Loader from './loader';

export default function LoaderWrapper({ children }: { children: React.ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  return (
    <>
      {isHomePage && <Loader onLoadComplete={() => setIsLoaded(true)} />}
      <div 
        style={{ 
          opacity: isHomePage ? (isLoaded ? 1 : 0) : 1, 
          transition: 'opacity 0.3s'
        }}
        aria-hidden={isHomePage && !isLoaded ? 'true' : undefined}
      >
        {children}
      </div>
    </>
  );
}
