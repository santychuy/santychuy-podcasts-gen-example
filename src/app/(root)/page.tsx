'use client';

import PodcastCard from '@/components/PodcastCard';
import { podcastData } from '@/constants/podcastData';

const Home = () => {
  return (
    <section className="flex flex-col gap-10">
      <h1 className="text-2xl font-bold text-white-1">Trending Podcasts</h1>

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
