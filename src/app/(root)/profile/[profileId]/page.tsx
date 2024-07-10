/* eslint-disable multiline-ternary */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client';

import { useQuery } from 'convex/react';
import { Loader } from 'lucide-react';

import PodcastCard from '@/components/PodcastCard';
import ProfileCard from '@/components/ProfileCard';

import { api } from '../../../../../convex/_generated/api';

const ProfilePage = ({
  params
}: {
  params: {
    profileId: string;
  };
}) => {
  const user = useQuery(api.users.getUserById, {
    clerkId: params.profileId
  });

  const podcastsData = useQuery(api.podcasts.getPodcastByAuthorId, {
    authorId: params.profileId
  });

  if (!user || !podcastsData) {
    return <Loader size={20} className="animate-spin text-white-1" />;
  }

  console.log(podcastsData);

  return (
    <section className="mt-9 flex flex-col">
      <h1 className="text-20 font-bold text-white-1 max-md:text-center">
        Podcaster Profile
      </h1>
      <div className="mt-6 flex flex-col gap-6 max-md:items-center md:flex-row">
        <ProfileCard
          podcastData={podcastsData}
          imageUrl={user?.imageUrl!}
          userFirstName={user?.name!}
        />
      </div>
      <section className="mt-9 flex flex-col gap-5">
        <h1 className="text-20 font-bold text-white-1">All Podcasts</h1>
        {podcastsData && podcastsData.podcasts.length > 0 ? (
          <div className="podcast_grid">
            {podcastsData?.podcasts
              ?.slice(0, 4)
              .map((podcast) => (
                <PodcastCard
                  key={podcast._id}
                  imageUrl={podcast.imageUrl!}
                  title={podcast.title!}
                  description={podcast.description}
                  id={podcast._id}
                />
              ))}
          </div>
        ) : (
          <p className="text-white-1">No podcast created yet</p>
        )}
      </section>
    </section>
  );
};

export default ProfilePage;
