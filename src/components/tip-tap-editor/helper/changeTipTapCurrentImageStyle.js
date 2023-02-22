export const changeTipTapCurrentImageStyle = (style) => {
  if (window.tipTapImageAttributeCurrentNode) {
    window.tipTapImageAttributeCurrentNode.setAttribute('style', inlineStyleConversion(style));
  }
};

export default changeTipTapCurrentImageStyle;
