export const styleStringToObject = (styleString) => {
  if (!styleString) {
    return {};
  }
  const resultStyleObj = {};
  styleString.split(';').forEach((styleAttribute) => {
    const style = styleAttribute.split(':');
    resultStyleObj[style[0]] = style[1];
  });

  return resultStyleObj;
};

export default styleStringToObject;
