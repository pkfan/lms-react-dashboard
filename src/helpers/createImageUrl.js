import config from '@/config';

export function createImageUrl({ directory, imageName }) {
  const url = `${config.domainUrl}/${directory}/${imageName}.webp`;
  return url;
}

export default createImageUrl;
