'use client';

import { useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';

import PodcastCard from '@/components/PodcastCard';
import { podcastData } from '@/constants/podcastData';

const Home = () => {
  const tasks = useQuery(api.tasks.get);

  return (
    <section className="flex flex-col gap-10">
      <h1 className="text-2xl font-bold text-white-1">Trending Podcasts</h1>

      {tasks?.map(({ _id, text }) => (
        <div className="text-white-1" key={_id}>
          {text}
        </div>
      ))}
      <div className="podcast_grid">
        {podcastData.map(({ id, title, description, imgURL }) => {
          return (
            <PodcastCard
              key={id}
              id={id}
              title={title}
              description={description}
              imgURL={imgURL}
            />
          );
        })}
      </div>
    </section>
  );
};

export default Home;
