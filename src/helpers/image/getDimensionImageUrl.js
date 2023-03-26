import config from '@/config';

export function getDimensionImageUrl({ dimension = '640X360', extension = 'png' }) {
  return `${config.domainUrl}/storage/images/${dimension}.${extension}`;
}

export default getDimensionImageUrl;
