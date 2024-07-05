/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable multiline-ternary */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
'use client';

import { useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Loader } from 'lucide-react';

import type { VoiceType } from '@/types';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import GeneratePodcast from '@/components/GeneratePodcast';
import GenerateThumbnail from '@/components/GenerateThumbnail';

import type { Id } from '../../../../convex/_generated/dataModel';

const voicesCategories = ['alloy', 'shimmer', 'nova', 'echo', 'fable', 'onyx'];

const formSchema = z.object({
  title: z.string().min(10, {
    message: 'The podcast title must be at least 10 characters.'
  }),
  description: z.string().min(20, {
    message: 'The podcast description must be at least 20 characters.'
  })
});

const CreatePodcast = () => {
  //  TODO: Improve it using Tanstack Query
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [imagePrompt, setImagePrompt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imageStorageId, setImageStorageId] = useState<Id<'_storage'> | null>(
    null
  );

  const [audioUrl, setAudioUrl] = useState('');
  const [audioDuration, setAudioDuration] = useState(0);
  const [audioStorageId, setAudioStorageId] = useState<Id<'_storage'> | null>(
    null
  );

  const [voiceType, setVoiceType] = useState<VoiceType>();
  const [voicePrompt, setVoicePrompt] = useState('');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: ''
    }
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <section className="flex flex-col">
      <h1 className="text-2xl font-bold text-white-1">Create Podcast</h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-12 flex flex-col w-full gap-7"
        >
          <div className="flex flex-col gap-[30px] border-b border-black-5 pb-12">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2.5">
                  <FormLabel className="text-16 font-bold text-white-1">
                    Podcast Title
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="input-class focus-visible:ring-offset-orange-1"
                      placeholder="Creativo"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-white-1" />
                </FormItem>
              )}
            />

            <div className="flex flex-col gap-4">
              <Label className="text-16 font-bold text-white-1">
                Select AI Voice
              </Label>

              <Select
                onValueChange={(value) => {
                  const voice = value as VoiceType;
                  setVoiceType(voice);
                }}
              >
                <SelectTrigger
                  className={cn(
                    'text-16 w-full border-none bg-black-1 text-gray-1 focus-visible:ring-offset-orange-1'
                  )}
                >
                  <SelectValue
                    placeholder="Select AI voice"
                    className="text-16 placeholder:text-gray-1"
                  />
                </SelectTrigger>
                <SelectContent className="text-16 border-none bg-black-1 font-bold text-white-1">
                  {voicesCategories.map((voice) => (
                    <SelectItem
                      className="capitalize focus:bg-orange-1"
                      value={voice}
                      key={voice}
                    >
                      {voice}
                    </SelectItem>
                  ))}
                </SelectContent>
                {voiceType && (
                  <audio
                    src={`/${voiceType}.mp3`}
                    autoPlay
                    className="hidden"
                  />
                )}
              </Select>
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2.5">
                  <FormLabel className="text-16 font-bold text-white-1">
                    Podcast Description
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      className="input-class focus-visible:ring-offset-orange-1"
                      placeholder="Describe your podcast"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-white-1" />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col pt-4">
            <GeneratePodcast
              setAudioStorageId={setAudioStorageId}
              setAudio={setAudioUrl}
              voiceType={voiceType!}
              audio={audioUrl}
              voicePrompt={voicePrompt}
              setVoicePrompt={setVoicePrompt}
              setAudioDuration={setAudioDuration}
            />

            <GenerateThumbnail />

            <div className="mt-10 w-full">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="text-16 w-full bg-orange-1 py-4 font-extrabold text-white-1 transition-all duration-500 hover:bg-black-1"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-1">
                    Submitting...
                    <Loader size={20} className="animate-spin" />
                  </span>
                ) : (
                  'Submit & Publish Podcast'
                )}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </section>
  );
};

export default CreatePodcast;
