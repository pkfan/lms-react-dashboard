export function getExtensionFromFileName(filename) {
  if (filename.lastIndexOf('.') == -1) {
    throw new Error('[pkfan error] filename not has any extension/format (i.e. mp4, pdf, docx)');
  }

  let fileExtension = filename.substring(filename.lastIndexOf('.') + 1, filename.length);

  return fileExtension;
}

export default getExtensionFromFileName; //mp4, pdf, docx
