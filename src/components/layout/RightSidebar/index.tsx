/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
'use client';

import { SignedIn, UserButton, useUser } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import { useQuery } from 'convex/react';
import { useRouter } from 'next/navigation';
import { Loader } from 'lucide-react';

import { useAudio } from '@/hooks/useAudio';
import { cn } from '@/lib/utils';

import { api } from '../../../../convex/_generated/api';

import Header from './Header';
import Carousel from './Carousel';

const RightSidebar = () => {
  const { user } = useUser();
  const router = useRouter();
  const { audio } = useAudio();

  const topPodcasters = useQuery(api.users.getTopUserByPodcastCount);

  if (!topPodcasters) {
    return <Loader className="animate-spin text-white-1" size={20} />;
  }

  return (
    <section
      className={cn('right_sidebar text-white-1 h-[calc(100vh-5px)]', {
        'h-[calc(100vh-140px)]': audio?.audioUrl
      })}
    >
      <SignedIn>
        <Link href={`/profile/${user?.id}`} className="flex gap-3 pb-12">
          <UserButton />
          <div className="flex w-full items-center justify-between">
            <h1 className="text-16 truncate font-semibold text-white-1">
              {user?.firstName} {user?.lastName}
            </h1>
            <Image
              src="/icons/right-arrow.svg"
              alt="arrow"
              width={24}
              height={24}
            />
          </div>
        </Link>
      </SignedIn>

      <section className="flex flex-col gap-3">
        <Header title="Fans Like You" />
        <Carousel fansLikeDetail={topPodcasters} />
      </section>

      <section className="flex flex-col gap-8 pt-12">
        <Header title="Top Podcasters" />
        <div className="flex flex-col gap-6">
          {topPodcasters?.slice(0, 4).map((podcaster) => (
            <div
              key={podcaster._id}
              className="flex cursor-pointer justify-between items-center"
              onClick={() => {
                router.push(`/profile/${podcaster.clerkId}`);
              }}
            >
              <figure className="flex items-center gap-2">
                <Image
                  src={podcaster.imageUrl}
                  alt={podcaster.name}
                  width={44}
                  height={44}
                  className="aspect-square rounded-lg"
                />
                <h2 className="text-14 font-semibold text-white-1">
                  {podcaster.name}
                </h2>
              </figure>

              <p className="text-12 font-normal">
                {podcaster.totalPodcasts}{' '}
                {podcaster.totalPodcasts === 1 ? 'podcast' : 'podcasts'}
              </p>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
};

export default RightSidebar;
