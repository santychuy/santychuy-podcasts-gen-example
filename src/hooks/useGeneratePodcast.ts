/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { useState } from 'react';
import { useAction, useMutation } from 'convex/react';
import { v4 as uuidv4 } from 'uuid';
import { useUploadFiles } from '@xixixao/uploadstuff/react';
import { toast } from 'sonner';

import type { GeneratePodcastProps } from '@/types';
import { api } from '../../convex/_generated/api';

export const useGeneratePodcast = ({
  setAudio,
  voiceType,
  voicePrompt,
  setAudioStorageId
}: GeneratePodcastProps) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const getPodcastAudio = useAction(api.openai.generateAudioAction);

  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const getAudioUrl = useMutation(api.podcasts.getUrl);
  const { startUpload } = useUploadFiles(generateUploadUrl);

  const generatePodcast = async () => {
    setIsGenerating(true);

    setAudio('');

    if (!voicePrompt) {
      toast.error('Please enter a voice prompt');
      setIsGenerating(false);
      return;
    }

    try {
      // Call the API to generate the podcast
      const audioBuffer = await getPodcastAudio({
        input: voicePrompt,
        voice: voiceType
      });

      // TODO: Investigate what is a Blob in general terms
      const audioBlob = new Blob([audioBuffer], { type: 'audio/mpeg' });

      const fileName = `podcast-${uuidv4()}.mp3`;
      const file = new File([audioBlob], fileName, { type: 'audio/mpeg' });

      const uploaded = await startUpload([file]);

      // FIXME: Why unknown type?
      const storageId = (uploaded[0].response as any).storageId;

      setAudioStorageId(storageId);

      const audioUrl = await getAudioUrl({ storageId });

      if (!audioUrl) {
        toast.error('Error generating podcast');
        return;
      }

      setAudio(audioUrl);

      toast.success('Podcast generated successfully!');
    } catch (error) {
      console.log('Error generating podcast: ', error);
      toast.error('Error generating podcast');
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    isGenerating,
    generatePodcast
  };
};
