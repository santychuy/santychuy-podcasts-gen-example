/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { useState } from 'react';

import type { GeneratePodcastProps } from '@/types';

export const useGeneratePodcast = ({
  setAudio,
  voiceType,
  voicePrompt,
  setAudioStorageId
}: GeneratePodcastProps) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePodcast = async () => {
    setIsGenerating(true);

    // Call the API to generate the podcast
    setAudio('');

    if (!voicePrompt) {
      // TODO: Add toast error messsage
      setIsGenerating(false);
      return;
    }

    try {
      // Call the API to generate the podcast
    } catch (error) {
      console.log('Error generating podcast: ', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    isGenerating,
    generatePodcast
  };
};
