import config from '@/config';

export function createImageUrl(image) {
  const url = `${config.domainUrl}/${image.url}`;
  return url;
}

export default createImageUrl;
