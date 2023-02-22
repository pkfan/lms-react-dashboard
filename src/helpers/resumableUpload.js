import Resumable from 'resumablejs';
import { isValidSize } from './SizeFromBytes';

export function resumableUpload({
  domElement,
  url = null,
  fileExtenstions = ['jpg', 'jpeg', 'png', 'webp'],
  maxFiles = undefined,
  maxFileSize = '10-MB',
  onAdded = () => {},
  onProgress = () => {},
  onSuccess = () => {},
  onError = () => {},
}) {
  if (!url) {
    throw new Error('[pkfan error] Remote URL not defined, please set URL to upload file');
  }

  if (domElement.getAttribute('resumableUploadCall') == 'true') {
    console.log('resumableUpload call', domElement);
    return;
  }

  const counterObj = { uniqueId: { counter: 0 } };

  domElement.setAttribute('resumableUploadCall', 'true');

  let resumable = new Resumable({
    // target: config.baseUrl + '/image',
    target: url,
    //   query: { _token: window.csrf_token }, // CSRF token
    fileType: fileExtenstions,
    // fileType: ['ts', 'mp4', 'html'],
    // fileType: ['mp4','mp3'],
    // fileType: ['ts'],
    simultaneousUploads: 1,
    maxFiles,
    chunkSize: 10 * 1024 * 1024, // 10MB
    headers: {
      Accept: 'application/json',
    },
    withCredentials: true,
    testChunks: false,
    throttleProgressCallbacks: 1,
    uploadMethod: 'POST',
    // maxFileSize: 10 * 1024,
    // chunkRetryInterval: 5 * 1000, //miliseconds
  });

  // if (browseLessonFiles[0] && domElement[0]) {
  //   resumable.assignBrowse(browseLessonFiles[0]);
  resumable.assignBrowse(domElement);
  //   resumable.assignDrop(domElement);
  // }

  resumable.on('fileAdded', function ({ file }) {
    // trigger when lessonFile picked

    // showProgress(lessonFile.file.uniqueIdentifier);
    if (!isValidSize(file.size, maxFileSize)) {
      onError({
        file,
        response: {
          message: `your file size must be less or equal to ${maxFileSize.replace('-', ' ')}`,
        },
      });
      throw new Error('[pkfan error] isValidSize() error, your file size must be');
    }

    onAdded({ file });
    console.log("resumable.on('lessonFileAdded' :  lessonFile : ", file);
    resumable.upload(); // to actually start uploading.
  });

  resumable.on('fileSuccess', function ({ file }, response) {
    // trigger when file upload complete
    // console.log("resumable.on('fileSuccess' :  file : ",lessonFile );
    // console.log("resumable.on('fileSuccess' :  response : ",response );

    onSuccess({ file, response: JSON.parse(response) });
    console.log('response.path : ', JSON.parse(response));
    //   insertTickMarkOnFileSuccess(lessonFile.file);
  });

  resumable.on('fileError', function ({ file }, response) {
    // trigger when there is any error
    // alert('file uploading error.')
    // console.log('fileError response : ', JSON.parse(response)["message"]);
    onError({ file, response: JSON.parse(response) });
    console.log('fileError response res : ', response);
    //   insertCrossMarkOnFileError(lessonFile.file);
    //   fileErrorFromServerSide(lessonFile.file, JSON.parse(response)['message']);
  });
  // resumable.on('error', function (response, { file }) {
  //   // trigger when there is any error
  //   // alert('file uploading error.')
  //   // console.log('fileError response : ', JSON.parse(response)["message"]);
  //   onError({ file, response });
  //   console.log('error response resumble: ', response);
  //   //   insertCrossMarkOnFileError(lessonFile.file);
  //   //   fileErrorFromServerSide(lessonFile.file, JSON.parse(response)['message']);
  // });
  resumable.on('fileProgress', function ({ file, progress }) {
    // trigger when file progress update

    onProgress({ file, progress: Math.floor(progress() * 100) });
    console.log("resumable.on('fileProgress' :  file : ", Math.floor(progress() * 100));
  });
  resumable.on('fileRetry', function ({ file }) {
    // trigger when file progress update
    if (!counterObj[file.uniqueIdentifier]) {
      counterObj[file.uniqueIdentifier] = { counter: 0 };
    }

    // maximum retry is 10
    if (counterObj[file.uniqueIdentifier].counter >= 10) {
      onError({
        file,
        response: {
          message: `file was not uploaded after 10 retries.`,
        },
      });
      throw new Error('[pkfan error] cannot upload files after 10 retries and cancel it now.');
    }
    counterObj[file.uniqueIdentifier].counter = counterObj[file.uniqueIdentifier].counter + 1;

    console.log("resumable.on('fileRetry' :  file : ", file);
  });

  // this callback method is used for events catch
  resumable.on('catchAll', function (event) {
    console.log("resumable.on('catchAll' :  event : ", event);
  });
}

export default resumableUpload;
