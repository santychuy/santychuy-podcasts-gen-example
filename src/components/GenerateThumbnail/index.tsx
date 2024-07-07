/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable multiline-ternary */
'use client';
import { useState, useRef } from 'react';
import Image from 'next/image';
import { Loader } from 'lucide-react';
import { toast } from 'sonner';
import { useUploadFiles } from '@xixixao/uploadstuff/react';
import { useAction, useMutation } from 'convex/react';
import { v4 as uuidv4 } from 'uuid';

import type { GenerateThumbnailProps } from '@/types';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';

import { api } from '../../../convex/_generated/api';

const GenerateThumbnail = ({
  setImage,
  setImageStorageId,
  image,
  imagePrompt,
  setImagePrompt
}: GenerateThumbnailProps) => {
  const [isAIThumbnail, setIsAIThumbnail] = useState(false);

  const [isImageLoading, setIsImageLoading] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);

  const imageRef = useRef<HTMLInputElement>(null);

  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const getImageUrl = useMutation(api.podcasts.getUrl);
  const { startUpload } = useUploadFiles(generateUploadUrl);

  const handleGenerateThumbnail = useAction(api.openai.generateThumbnailAction);

  // TODO: Understand blob, arraybuffer, buffer
  // Creates a new file of image/png to upload it to convex to retrieve the url
  // then to have the storageId and set the image to display a preview of it
  const handleImage = async (blob: Blob, fileName: string) => {
    setIsImageLoading(true);
    setImage('');

    try {
      const file = new File([blob], fileName, { type: 'image/png' });

      const uploaded = await startUpload([file]);

      // FIXME: Why unknown type?
      const storageId = (uploaded[0].response as any).storageId;

      setImageStorageId(storageId);

      const imageUrl = await getImageUrl({ storageId });
      setImage(imageUrl!);
      toast.success('Thumbnail uploaded succesfully!');
    } catch (error) {
      toast.error('Error generating thumbnail');
    } finally {
      setIsImageLoading(false);
    }
  };

  // Upload manually
  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    try {
      const files = e.target.files;

      if (!files) return;

      const file = files[0];

      const blob = await file
        .arrayBuffer()
        .then((arrayBuffer) => new Blob([arrayBuffer]));

      await handleImage(blob, file.name);
    } catch (error) {
      toast.error('Error uploading image');
    }
  };

  // By AI
  const generateImage = async () => {
    setIsGeneratingImage(true);
    try {
      const res = await handleGenerateThumbnail({ prompt: imagePrompt });

      const blob = new Blob([res], { type: 'image/png' });

      await handleImage(blob, `thumbnail-${uuidv4()}.png`);
    } catch (error) {
      console.log(error);
      toast.error('Error generating thumbnail');
    } finally {
      setIsGeneratingImage(false);
    }
  };

  return (
    <>
      <div className="generate_thumbnail">
        <Button
          type="button"
          variant="plain"
          onClick={() => {
            setIsAIThumbnail(true);
          }}
          className={cn('', { 'bg-black-6': isAIThumbnail })}
        >
          Use AI to generate thumbnail
        </Button>
        <Button
          type="button"
          variant="plain"
          onClick={() => {
            setIsAIThumbnail(false);
          }}
          className={cn('', { 'bg-black-6': !isAIThumbnail })}
        >
          Upload custom image
        </Button>
      </div>

      {isAIThumbnail ? (
        <div className="flex flex-col gap-5">
          <div className="mt-5 flex flex-col gap-4">
            <Label className="text-16 font-bold text-white-1">
              AI Prompt to generate Podcast
            </Label>

            <Textarea
              placeholder="Provide text to generate thumbnail"
              rows={5}
              onChange={(e) => {
                setImagePrompt(e.target.value);
              }}
              value={imagePrompt}
              className="input-class font-light focus-visible:ring-offset-orange-1"
            />
          </div>

          <div className="w-full max-w-[200px]">
            <Button
              type="button"
              disabled={isImageLoading || isGeneratingImage}
              onClick={generateImage}
              className="text-16 bg-orange-1 py-4 font-bold text-white-1"
            >
              {isImageLoading || isGeneratingImage ? (
                <span className="flex items-center gap-1">
                  Generating...
                  <Loader size={20} className="animate-spin" />
                </span>
              ) : (
                'Generate'
              )}
            </Button>
          </div>
        </div>
      ) : (
        <div
          className="image_div"
          onClick={() => {
            imageRef?.current?.click();
          }}
        >
          <Input
            type="file"
            className="hidden"
            ref={imageRef}
            onChange={uploadImage}
          />
          {!isImageLoading ? (
            <Image
              src="/icons/upload-image.svg"
              width={40}
              height={40}
              alt="upload"
            />
          ) : (
            <div className="text-16 flex flex-col gap-1 items-center font-medium text-white-1">
              <p>Uploading</p>
              <Loader size={20} className="ml-2 animate-spin" />
            </div>
          )}

          <div className="flex flex-col items-center gap-1">
            <h2 className="text-12 font-bold text-orange-1">Click to upload</h2>
            <p className="text-12 font-normal text-gray-1">
              SVG, PNG, JPG, or GIF (max. 1080x1080px)
            </p>
          </div>
        </div>
      )}

      {image && (
        <div className="flex-center w-full">
          <Image
            src={image}
            width={200}
            height={200}
            className="mt-5"
            alt="thumbnail"
          />
        </div>
      )}
    </>
  );
};

export default GenerateThumbnail;
