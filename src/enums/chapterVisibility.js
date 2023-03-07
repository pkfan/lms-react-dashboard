export const chapterVisibility = (type = 0) => {
  const chapterVisibility = ['private', 'public'];

  return chapterVisibility[type];
};

export default chapterVisibility;
