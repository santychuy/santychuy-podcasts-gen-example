import { v } from 'convex/values';
import OpenAI from 'openai';
import type { SpeechCreateParams } from 'openai/resources/audio/speech.mjs';

import { action } from './_generated/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export const generateAudioAction = action({
  args: { input: v.string(), voice: v.string() },
  handler: async (_, args) => {
    const { input, voice } = args;

    const mp3 = await openai.audio.speech.create({
      model: 'tts-1',
      voice: voice as SpeechCreateParams['voice'],
      input
    });

    // TODO: Investigate what is a Buffer in general terms
    const buffer = await mp3.arrayBuffer();

    return buffer;
  }
});
