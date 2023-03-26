export const statusEnum = (type = 0) => {
  const statusEnum = ['pending', 'approved', 'reject', 'blocked'];

  return statusEnum[type];
};

export default statusEnum;
