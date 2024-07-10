/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable multiline-ternary */
'use client';
import { useQuery } from 'convex/react';

import { Skeleton } from '@/components/ui/skeleton';
import PodcastCard from '@/components/PodcastCard';

import { api } from '../../../convex/_generated/api';

const Home = () => {
  const podcasts = useQuery(api.podcasts.getPodcasts);

  return (
    <section className="flex flex-col gap-10 md:overflow-hidden">
      <h1 className="text-2xl font-bold text-white-1">Trending Podcasts</h1>

      <div className="podcast_grid">
        {!podcasts &&
          Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} className="size-[200px] rounded-xl" />
          ))}
        {podcasts?.map(({ _id, title, description, imageUrl }) => {
          return (
            <PodcastCard
              key={_id}
              id={_id}
              title={title}
              description={description}
              imageUrl={imageUrl}
            />
          );
        })}
      </div>
    </section>
  );
};

export default Home;
