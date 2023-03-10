import { useEffect, useState, useRef } from 'react';
import { Flex, Stack, Title } from '@mantine/core';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { BsUpload } from 'react-icons/bs';
import ButtonWhite from '@/components/common/ButtonWhite';
import config from '@/config';
import resumableUpload from '@/helpers/resumableUpload';
import LessonsRingProgress from './LessonsRingProgress';

class AllLessonsFileStaticClass {
  static fileList = [];
  static fileObjProgress = { uniqueIdentifier: 'progress' };
}

export function UploadLessons({ courseId, chapterId }) {
  const elementRef = useRef();
  const elementDropRef = useRef();

  const [lessonsAddedList, setLessonsAddedList] = useState([]);
  const [lessonsProgressObj, setLessonsProgressObj] = useState({ uniqueIdentifier: 'progress' });
  const [lessonsSuccess, setLessonsSuccess] = useState({ response: null });
  const [lessonsError, setLessonsError] = useState({ response: null });

  // console.log('lessonsProgress', lessonsProgress.file?.uniqueIdentifier, lessonsProgress.progress);
  console.log('lessonsAddedList ============', lessonsAddedList);

  const delayToSetAllLessonsAdded = () => {
    setLessonsAddedList(AllLessonsFileStaticClass.fileList);
  };

  let clearTimeid;

  const setLessonsAddedWrapper = (fileObj) => {
    AllLessonsFileStaticClass.fileList.push(fileObj);
    setLessonsAddedList(AllLessonsFileStaticClass.fileList);

    // clearTimeout(clearTimeid);
    // clearTimeid = setTimeout(() => {
    //   delayToSetAllLessonsAdded();
    // }, 1000);
  };
  const setLessonsProgressWrapper = (fileObj) => {
    lessonsProgressObj[fileObj.file.uniqueIdentifier] = fileObj.progress;
    setLessonsProgressObj(lessonsProgressObj);

    // AllLessonsFileStaticClass.fileObjProgress[fileObj.file.uniqueIdentifier] = fileObj.progress;

    console.log('lessonsProgressObj =========== : ', lessonsProgressObj);
    // let progressCircle = document.getElementById(fileObj.file.uniqueIdentifier);
    // if (progressCircle) {
    //   progressCircle.innerHTML = `${fileObj.progress}%`;
    // }
    // console.log(
    //   'AllLessonsFileStaticClass.fileObjProgress =========== : ',
    //   AllLessonsFileStaticClass.fileObjProgress,
    // );
  };

  useEffect(() => {
    console.log('resumableUpload effect called');
    const divElement = elementRef.current;
    const divDropElement = elementDropRef.current;

    // if (divElement) {
    //   divElement.setAttribute('resumableuploadcall', 'false');
    // }
    console.log('divElement', divElement);

    const lessonsUploadRelativeUrl = `/upload/${courseId}/${chapterId}`;

    resumableUpload({
      domElement: divElement,
      domDropElement: divDropElement,
      url: config.baseUrl + lessonsUploadRelativeUrl,
      maxFiles: 10,
      maxFileSize: '1500-MB',
      fileExtenstions: ['mp4'],
      onAdded: setLessonsAddedWrapper,
      onProgress: setLessonsProgressWrapper,
      onSuccess: setLessonsSuccess,
      onError: setLessonsError,
    });
  }, [courseId, chapterId]);

  return (
    <>
      <Flex ref={elementRef} w="100%" justify="end" align="center" py={12}>
        <ButtonWhite leftIcon={<BsUpload size={18} />}>Upload Lessons</ButtonWhite>
      </Flex>

      <Stack>
        {lessonsAddedList.length > 0 &&
          [...lessonsAddedList].map((lessonsAdded) => (
            <LessonsRingProgress
              key={lessonsAdded.file.uniqueIdentifier}
              lessonsAdded={lessonsAdded}
              // fileObjProgress={AllLessonsFileStaticClass.fileObjProgress}
              lessonsProgressObj={lessonsProgressObj}
            />
          ))}
      </Stack>

      <Stack
        justify="center"
        align="center"
        ref={elementDropRef}
        sx={(theme) => ({ color: theme.colors.lmsPrimary[6], width: '100%', height: '100%' })}
      >
        <FaCloudUploadAlt size={150} />
        <Title order={4}> Drag & Drop Lessons.</Title>
      </Stack>
    </>
  );
}

export default UploadLessons;
