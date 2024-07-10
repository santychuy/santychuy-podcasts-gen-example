export const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);

  const remainingSecs = Math.floor(seconds % 60);

  return `${mins}:${remainingSecs < 10 ? '0' : ''}${remainingSecs}`;
};
