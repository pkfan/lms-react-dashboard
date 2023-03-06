export const imageTypes = (type = 0) => {
  const imageTypes = ['avatar', 'cover', 'thumbnail', 'body', 'other'];

  return imageTypes[type];
};

export default imageTypes;
