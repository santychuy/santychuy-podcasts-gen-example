import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface PodcastCardProps {
  title: string;
  description: string;
  imageUrl: string;
  id: string;
}

const PodcastCard = ({
  title,
  description,
  imageUrl,
  id
}: PodcastCardProps) => {
  const router = useRouter();

  const handleViews = () => {
    router.push(`/podcast/${id}`, { scroll: true });
  };

  return (
    <div className="cursor-pointer" onClick={handleViews}>
      <figure className="flex flex-col gap-2">
        <Image
          src={imageUrl}
          alt={title}
          width={174}
          height={174}
          className="aspect-square h-fit w-full max-w-[200px] rounded-xl"
        />
        <div className="flex flex-col">
          <h1 className="text-16 truncate font-bold text-white-1">{title}</h1>
          <h2 className="text-12 truncate font-normal capitalize text-white-4">
            {description}
          </h2>
        </div>
      </figure>
    </div>
  );
};

export default PodcastCard;
