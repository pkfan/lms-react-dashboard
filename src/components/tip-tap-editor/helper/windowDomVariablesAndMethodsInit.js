window.tipTapImageAttributeCurrentNode;
window.tipTapImageAttributesObjectFromCallback = {};

window.getTipTapImageAttributesCallback = (event) => {
  console.log('getImageAttributesCallback call and worked ...', event);
  window.tipTapImageAttributeCurrentNode = event;
  window.tipTapImageAttributesObjectFromCallback['title'] = event.getAttribute('title');
  window.tipTapImageAttributesObjectFromCallback['src'] = event.getAttribute('src');
  window.tipTapImageAttributesObjectFromCallback['alt'] = event.getAttribute('alt');
  window.tipTapImageAttributesObjectFromCallback['style'] = event.getAttribute('style');
  window.tipTapImageAttributesObjectFromCallback['width'] = event.getAttribute('width');
  window.tipTapImageAttributesObjectFromCallback['height'] = event.getAttribute('height');
};
