'use client';

import { createContext, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

import type { AudioContextType, AudioProps } from '@/types';

export const AudioContext = createContext<AudioContextType | undefined>(
  undefined
);

const AudioProvider = ({ children }: { children: React.ReactNode }) => {
  const [audio, setAudio] = useState<AudioProps | undefined>();

  const pathname = usePathname();

  useEffect(() => {
    if (pathname === '/create/podcast') {
      setAudio(undefined);
    }
  }, [pathname]);

  return (
    <AudioContext.Provider value={{ audio, setAudio }}>
      {children}
    </AudioContext.Provider>
  );
};

export default AudioProvider;
