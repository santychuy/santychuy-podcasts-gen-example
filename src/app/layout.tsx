import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';

import { Toaster } from '@/components/ui/sonner';
import ConvexClerkProvider from '@/providers/ConvexClerkProvider';
import AudioProvider from '@/providers/AudioProvider';

import './globals.css';

const manrope = Manrope({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Santychuy Podcast Gen',
  description: 'You can easly create your podcast with Santychuy Podcast Gen'
};

const RootLayout = ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body className={manrope.className}>
        <ConvexClerkProvider>
          <AudioProvider>{children}</AudioProvider>
        </ConvexClerkProvider>
        <Toaster />
      </body>
    </html>
  );
};

export default RootLayout;
