const MEMORY_SIZE_MEAURE = 1024;
const KB = MEMORY_SIZE_MEAURE;
const MB = MEMORY_SIZE_MEAURE ** 2;
const GB = MEMORY_SIZE_MEAURE ** 3;

export function createFileSize(bytes) {
  //   const TB = MEMORY_SIZE_MEAURE ** 4; // not allowd
  let size;
  if (bytes / KB < MEMORY_SIZE_MEAURE) {
    size = Number(bytes / KB).toFixed(2) + ' KB';
  } else if (bytes / KB >= MEMORY_SIZE_MEAURE && bytes / MB < MEMORY_SIZE_MEAURE) {
    size = Number(bytes / MB).toFixed(2) + ' MB';
  } else if (bytes / MB >= MEMORY_SIZE_MEAURE && bytes / GB < MEMORY_SIZE_MEAURE) {
    size = Number(bytes / GB).toFixed(2) + ' GB';
  } else {
    throw new Error('too big file size in tera bytes [pkfan errors]');
  }

  return size;
}

export function getKB(bytes) {
  return Number(bytes / KB).toFixed(2);
}
export function getMB(bytes) {
  return Number(bytes / MB).toFixed(2);
}
export function getGB(bytes) {
  return Number(bytes / GB).toFixed(2);
}
export function isValidSize(bytes, sizeString = '5-MB') {
  const [size, unit] = sizeString.toUpperCase().split('-');

  if (unit == 'KB') {
    return getKB(bytes) <= Number(size);
  } else if (unit == 'MB') {
    return getMB(bytes) <= Number(size);
  } else if (unit == 'GB') {
    return getGB(bytes) <= Number(size);
  } else {
    throw new Error('[pkfan error] cannot validate size of inputs parameters');
  }
}

export default createFileSize;
