/* eslint-disable multiline-ternary */
'use client';

import { useQuery } from 'convex/react';
import { Loader } from 'lucide-react';

import PodcastCard from '@/components/PodcastCard';

import { api } from '../../../convex/_generated/api';

const Home = () => {
  const podcasts = useQuery(api.podcasts.getPodcasts);

  return (
    <section className="flex flex-col gap-10">
      <h1 className="text-2xl font-bold text-white-1">Trending Podcasts</h1>

      {podcasts === undefined ? (
        <Loader size={20} className="animate-spin text-white-1" />
      ) : (
        <div className="podcast_grid">
          {podcasts.map(({ _id, title, description, imageUrl }) => {
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
      )}
    </section>
  );
};

export default Home;
