const PodcastDetail = ({ params }: { params: { podcastId: string } }) => {
  return (
    <div className="text-white-1">PodcastDetail for {params.podcastId}</div>
  );
};

export default PodcastDetail;
