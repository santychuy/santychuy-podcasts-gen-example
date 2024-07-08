/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client';
import { useQuery } from 'convex/react';
import Image from 'next/image';

import PodcastDetailPlayer from '@/components/PodcastDetailPlayer';

import type { Id } from '../../../../../convex/_generated/dataModel';
import { api } from '../../../../../convex/_generated/api';
import PodcastCard from '@/components/PodcastCard';
import { useUser } from '@clerk/nextjs';

// TODO: Add skeleton component for the places where the podcast info will appear
const PodcastDetail = ({
  params
}: {
  params: { podcastId: Id<'podcasts'> };
}) => {
  const { user } = useUser();

  const podcast = useQuery(api.podcasts.getPodcastById, {
    podcastId: params.podcastId
  });

  const similarPodcasts = useQuery(api.podcasts.getPodcastByVoiceType, {
    podcastId: params.podcastId
  });

  const isOwner = user?.id === podcast?.authorId;

  return (
    <section className="flex flex-col w-full">
      <header className="mt-9 flex items-center justify-between">
        <h1 className="text-20 font-bold text-white-1">Currently playing</h1>
        <figure className="flex gap-3">
          <Image
            src="/icons/headphone.svg"
            width={24}
            height={24}
            alt="headphone"
          />
          <h2 className="text-16 font-bold text-white-1">
            {podcast ? podcast.views : '...'}
          </h2>
        </figure>
      </header>

      {podcast && (
        <PodcastDetailPlayer
          isOwner={isOwner}
          podcastId={podcast._id}
          title={podcast.title}
          imageUrl={podcast.imageUrl}
          author={podcast.author}
          authorId={podcast.authorId}
          authorImageUrl={podcast.authorImageUrl}
          imageStorageId={podcast.imageStorageId!}
          audioUrl={podcast.audioUrl!}
          audioStorageId={podcast.audioStorageId!}
        />
      )}

      <p className="text-white-2 text-16 pb-8 pt-[45px] font-medium max-md:text-center">
        {podcast?.description}
      </p>

      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <h1 className="text-18 font-bold text-white-1">Transcription</h1>
          <p className="text-16 font-medium text-white-2">
            {podcast?.voicePrompt}
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <h1 className="text-18 font-bold text-white-1">Thumbnail Prompt</h1>
          <p className="text-16 font-medium text-white-2">
            {podcast?.imagePrompt}
          </p>
        </div>
      </div>

      <section className="mt-8 flex flex-col gap-5">
        <h2 className="text-20 font-bold text-white-1">Similar Podcasts</h2>

        {similarPodcasts && similarPodcasts?.length > 0 && (
          <div>
            {similarPodcasts?.map(({ _id, title, description, imageUrl }) => (
              <PodcastCard
                key={_id}
                id={_id}
                title={title}
                description={description}
                imageUrl={imageUrl}
              />
            ))}
          </div>
        )}
      </section>
    </section>
  );
};

export default PodcastDetail;
