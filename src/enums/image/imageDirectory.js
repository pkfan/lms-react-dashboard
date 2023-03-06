export const imageDirectory = (directory = 3) => {
  const publicPaths = [
    'storage/images/avatar',
    'storage/images/cover',
    'storage/images/thumbnail',
    'storage/images/body',
    'storage/images/other',
  ];
  return publicPaths[directory];
};

export default imageDirectory;
