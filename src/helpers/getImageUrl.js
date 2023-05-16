// import { imageDirectory, imageExtensions } from '@/enums';
import createImageUrl from './createImageUrl';

export function getImageUrl(image) {
  const url = createImageUrl(image);

  return url;
}

export default getImageUrl;
