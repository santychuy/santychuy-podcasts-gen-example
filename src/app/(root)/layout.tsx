import Image from 'next/image';

import LeftSidebar from '@/components/layout/LeftSidebar';
import RightSidebar from '@/components/layout/RightSidebar';

const RootLayout = ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="relative flex flex-col">
      <main className="relative flex bg-black-3">
        <LeftSidebar />
        <section className="border-2 border-red-400 flex min-h-screen flex-1 flex-col px-4 sm:px-14">
          <div className="mx-auto flex w-full max-w-5xl flex-col max-sm:px-4">
            <div className="flex h-16 items-center justify-between md:hidden">
              <Image src="/icons/logo.svg" alt="logo" width={30} height={30} />
              <p>Mobile Nav</p>
            </div>
            <div>
              Toaster
              {children}
            </div>
          </div>
        </section>
        <RightSidebar />
      </main>
    </div>
  );
};

export default RootLayout;
