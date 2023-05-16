import { createImageUrl } from './createImageUrl';
import createResponseErrors from './createResponseErrors';
import { getExtensionFromFileName } from '@/helpers/getExtensionFromFileName';
import { getImageUrl } from './getImageUrl';
import { getUserCountryCodeFromBrowser } from './getUserCountryCodeFromBrowser';
import { loadMathJaxWithMathML } from './loadMathJaxWithMathML';
import { randomNumber } from './randomNumber';
import { resumableUpload } from './resumableUpload';
import calculateCourseDiscount from './course/calculateCourseDiscount';
import liveStatusAndColor from './course/liveStatusAndColor';
import statusAndColor from './course/statusAndColor';
import { getDimensionImageUrl } from './image/getDimensionImageUrl';
import getDefaultAvatarUrl from './image/getDefaultAvatarUrl';
import redirectTo from './redirectTo';
import imageUploadOnPaste from './imageUploadOnPaste';

export {
  createImageUrl,
  createResponseErrors,
  getExtensionFromFileName,
  getImageUrl,
  getUserCountryCodeFromBrowser,
  loadMathJaxWithMathML,
  randomNumber,
  resumableUpload,
  calculateCourseDiscount,
  liveStatusAndColor,
  statusAndColor,
  getDimensionImageUrl,
  getDefaultAvatarUrl,
  redirectTo,
  imageUploadOnPaste,
};
