/* eslint-disable multiline-ternary */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client';
import { useQuery } from 'convex/react';
import { Loader } from 'lucide-react';

import PodcastCard from '@/components/PodcastCard';
import Searchbar from '@/components/Searchbar';

import { api } from '../../../../convex/_generated/api';

const DiscoverPage = ({
  searchParams
}: {
  searchParams: { search: string };
}) => {
  const podcastsData = useQuery(api.podcasts.getPodcastBySearch, {
    search: searchParams.search
  });

  return (
    <section className="flex flex-col gap-9">
      <Searchbar />
      <div className="flex flex-col gap-9">
        <h1 className="text-20 font-bold text-white-1">
          {!searchParams.search ? 'Discover' : 'Search results for: '}
          {searchParams.search && (
            <span className="text-orange-1 font-semibold">
              {searchParams.search}
            </span>
          )}
        </h1>

        {podcastsData ? (
          <>
            {podcastsData.length > 0 ? (
              <div className="podcast_grid">
                {podcastsData.map(({ _id, title, description, imageUrl }) => {
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
            ) : (
              <p className="text-white-1">No data...</p>
            )}
          </>
        ) : (
          <Loader size={20} className="animate-spin text-white-1" />
        )}
      </div>
    </section>
  );
};

export default DiscoverPage;
