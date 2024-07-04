/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable multiline-ternary */
'use client';

import { Loader } from 'lucide-react';

import type { GeneratePodcastProps } from '@/types';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useGeneratePodcast } from '@/hooks/useGeneratePodcast';

const GeneratePodcast = (props: GeneratePodcastProps) => {
  const { isGenerating, generatePodcast } = useGeneratePodcast(props);

  return (
    <div>
      <div className="flex flex-col gap-4">
        <Label className="text-16 font-bold text-white-1">
          AI Prompt to generate Podcast
        </Label>

        <Textarea
          placeholder="Provide text to generate audio"
          rows={5}
          onChange={(e) => {
            props.setVoicePrompt(e.target.value);
          }}
          className="input-class font-light focus-visible:ring-offset-orange-1"
        />
      </div>

      <div className="mt-5 w-full max-w-[200px]">
        <Button
          type="button"
          disabled={isGenerating}
          className="text-16 bg-orange-1 py-4 font-bold text-white-1"
        >
          {isGenerating ? (
            <span className="flex items-center gap-1">
              Generating...
              <Loader size={20} className="animate-spin" />
            </span>
          ) : (
            'Generate'
          )}
        </Button>
      </div>
      {props.audio && (
        <audio
          src={props.audio}
          controls
          autoPlay
          className="mt-5"
          onLoadedMetadata={(e) => {
            props.setAudioDuration(e.currentTarget.duration);
          }}
        />
      )}
    </div>
  );
};

export default GeneratePodcast;
