import { useRef, useEffect, useState } from 'react';
import Resumable from 'resumablejs';
import config from '@/config';
import { RingProgress, Text } from '@mantine/core';

function resumableUpload({
  domElement,
  url = null,
  fileExtenstions = ['jpg', 'jpeg', 'png', 'webp'],
  maxFiles = undefined,
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
  });

  // if (browseLessonFiles[0] && domElement[0]) {
  //   resumable.assignBrowse(browseLessonFiles[0]);
  resumable.assignBrowse(domElement);
  //   resumable.assignDrop(domElement);
  // }

  resumable.on('fileAdded', function (file) {
    // trigger when lessonFile picked

    // showProgress(lessonFile.file.uniqueIdentifier);
    onAdded(file);
    console.log("resumable.on('lessonFileAdded' :  lessonFile : ", file);

    resumable.upload(); // to actually start uploading.
  });

  resumable.on('fileProgress', function (file) {
    // trigger when file progress update

    onProgress({ file, progress: Math.floor(file.progress() * 100) });
    console.log("resumable.on('fileProgress' :  file : ", Math.floor(file.progress() * 100));
  });

  resumable.on('fileSuccess', function (file, response) {
    // trigger when file upload complete
    // console.log("resumable.on('fileSuccess' :  file : ",lessonFile );
    // console.log("resumable.on('fileSuccess' :  response : ",response );

    response = JSON.parse(response);
    onSuccess({ file, response });
    console.log('response.path : ', response);
    //   insertTickMarkOnFileSuccess(lessonFile.file);
  });

  resumable.on('fileError', function (file, response) {
    // trigger when there is any error
    // alert('file uploading error.')
    // console.log('fileError response : ', JSON.parse(response)["message"]);
    onError({ file, response });
    console.log('fileError response : ', response);
    //   insertCrossMarkOnFileError(lessonFile.file);
    //   fileErrorFromServerSide(lessonFile.file, JSON.parse(response)['message']);
  });
}

export function ResumableComponent() {
  const elementRef = useRef();
  const [progress, setProgress] = useState({ progress: 0 });
  useEffect(() => {
    const divElement = elementRef.current;
    console.log('divElement', divElement); // logs <div>I'm an element</div>

    resumableUpload({
      domElement: divElement,
      url: config.baseUrl + '/image',
      maxFiles: 1,
      fileExtenstions: ['mp4'],
      onProgress: setProgress,
    });
  }, []);

  return (
    <>
      <div id="drag-drop-lessons" ref={elementRef}>
        image upload test
      </div>
      <RingProgress
        sections={[{ value: progress.progress, color: 'lmsPrimary' }]}
        label={
          <Text color="lmsPrimary" weight={700} align="center" size="xl">
            {progress.progress}%
          </Text>
        }
      />
    </>
  );
}

export default ResumableComponent;
