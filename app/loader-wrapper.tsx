'use client';

import { useState } from 'react';
import Loader from './loader';

export default function LoaderWrapper({ children }: { children: React.ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      <Loader onLoadComplete={() => setIsLoaded(true)} />
      <div style={{ opacity: isLoaded ? 1 : 0, transition: 'opacity 0.3s' }}>
        {children}
      </div>
    </>
  );
}
