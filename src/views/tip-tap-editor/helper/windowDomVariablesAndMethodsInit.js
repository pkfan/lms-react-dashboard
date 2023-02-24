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

// // get image url with paste
// // https://stackoverflow.com/questions/6333814/how-does-the-paste-image-from-clipboard-functionality-work-in-gmail-and-google-c
// document.onpaste = function (event) {
//   var items = (event.clipboardData || event.originalEvent.clipboardData).items;
//   console.log('JSON.stringify(items) : image copy', JSON.stringify(items)); // might give you mime types
//   for (var index in items) {
//     var item = items[index];
//     if (item.kind === 'file') {
//       var blob = item.getAsFile();
//       var reader = new FileReader();
//       reader.onload = function (event) {
//         console.log('event.target.result : image copy', event.target.result); // data url!
//       };
//       console.log('blob : ', blob);
//       console.log('blob : ', blob.type);
//       reader.readAsDataURL(blob);
//     }
//   }
// };
