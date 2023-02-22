import styleStringToObject from './styleStringToObject';

export const inlineStyleConversion = (styleInput = {}) => {
  const oldStyle = styleStringToObject(window.tipTapImageAttributesObjectFromCallback['style']);
  console.log('old style : ', window.tipTapImageAttributesObjectFromCallback['style']);

  const mergeStyle = { ...oldStyle, ...styleInput };

  const result = Object.entries(mergeStyle).map((entry) => entry.join(':'));

  const inlineStyleString = result.join(';');

  return inlineStyleString;
};

export default inlineStyleConversion;
