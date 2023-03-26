export const liveStatusEnum = (type = 0) => {
  const liveStatusEnum = ['draft', 'private', 'publish'];

  return liveStatusEnum[type];
};

export default liveStatusEnum;
