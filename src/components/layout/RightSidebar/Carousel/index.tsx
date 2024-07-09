/* eslint-disable @typescript-eslint/prefer-optional-chain */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { useCallback } from 'react';
import type { EmblaCarouselType } from 'embla-carousel';
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Loader } from 'lucide-react';

import type { CarouselProps } from '@/types';
import { DotButton, useDotButton } from './DotButton';

const EmblaCarousel = ({ fansLikeDetail }: CarouselProps) => {
  const router = useRouter();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()]);

  const onNavButtonClick = useCallback((emblaApi: EmblaCarouselType) => {
    const autoplay = emblaApi?.plugins()?.autoplay;
    if (!autoplay || !('stopOnInteraction' in autoplay.options)) return;

    const resetOrStop =
      autoplay.options.stopOnInteraction === false
        ? autoplay.reset
        : autoplay.stop;

    resetOrStop();
  }, []);

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(
    emblaApi,
    onNavButtonClick
  );

  const slides =
    fansLikeDetail && fansLikeDetail.filter((item) => item.totalPodcasts > 0);

  if (!slides) {
    return <Loader className="text-white-1 animate-spin" size={20} />;
  }

  return (
    <section
      className="flex w-full flex-col gap-4 overflow-hidden"
      ref={emblaRef}
    >
      <div className="flex">
        {slides.slice(0, 5).map((item) => (
          <figure
            key={item._id}
            className="carousel_box"
            onClick={() => {
              router.push(`/podcast/${item.podcast[0].podcastId}`);
            }}
          >
            <Image
              src={item.imageUrl}
              alt="card"
              fill
              className="absolute size-full rounded-xl border-none"
            />

            <div className="glassmorphism-black relative z-10 flex flex-col rounded-b-xl p-4">
              <h2 className="text-14 font-semibold text-white-1">
                {item.podcast[0].podcastTitle}
              </h2>
              <p className="text-12 text-white-2 font-normal">{item.name}</p>
            </div>
          </figure>
        ))}
      </div>

      <div className="flex justify-center gap-2">
        {scrollSnaps.map((_, index) => (
          <DotButton
            key={index}
            onClick={() => {
              onDotButtonClick(index);
            }}
            selected={index === selectedIndex}
          />
        ))}
      </div>
    </section>
  );
};

export default EmblaCarousel;
