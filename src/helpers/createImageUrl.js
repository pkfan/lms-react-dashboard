import config from '@/config';

export function createImageUrl({ directory, imageName, imageExtension = 'webp' }) {
  const url = `${config.domainUrl}/${directory}/${imageName}.${imageExtension}`;
  return url;
}

export default createImageUrl;
