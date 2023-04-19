import { imageDirectory, imageExtensions } from '@/enums';
import createImageUrl from './createImageUrl';

export function getImageUrl(image) {
  let { file_name: imageName, extension, directory } = image;

  const imageExtension = imageExtensions(extension);
  directory = imageDirectory(directory);

  const url = createImageUrl({ directory, imageName, imageExtension });

  return url;
}

export default getImageUrl;
