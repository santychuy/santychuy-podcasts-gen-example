/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

import { useDebounce } from '@/hooks/useDebounce';

import { Input } from '../ui/input';

const Searchbar = () => {
  const [search, setSearch] = useState('');

  const router = useRouter();
  const pathname = usePathname();

  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    if (debouncedSearch) {
      router.push(`/discover?search=${debouncedSearch}`);
    } else if (!debouncedSearch && pathname === '/discover') {
      router.push('/discover');
    }
  }, [router, pathname, debouncedSearch]);

  return (
    <div className="relative mt-8 block">
      <Input
        className="input-class py-6 pl-12 focus-visible:ring-offset-orange-1"
        placeholder="Seach for podcasts"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        onLoad={() => {
          setSearch('');
        }}
      />
      <Image
        src="/icons/search.svg"
        alt="search"
        height={20}
        width={20}
        className="absolute left-4 top-3.5"
      />
    </div>
  );
};

export default Searchbar;
