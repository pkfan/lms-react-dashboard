import { useEffect, useState, useRef } from 'react';
import { Flex, Stack, Title } from '@mantine/core';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { BsUpload } from 'react-icons/bs';
import ButtonWhite from '@/components/common/ButtonWhite';
import config from '@/config';
import resumableUpload from '@/helpers/resumableUpload';
import LessonsRingProgress from './LessonsRingProgress';
import { useSelector, useDispatch } from 'react-redux';
import {
  createLessonsAddedList as createLessonsAddedListAction,
  createLessonsProgressObj as createLessonsProgressObjAction,
  createLessonsSuccessObj as createLessonsSuccessObjAction,
  createLessonsErrorObj as createLessonsErrorObjAction,
} from '@/views/roles/instructor/slice/lessonsUploadSlice';

export function UploadLessons({ courseId, chapterId }) {
  const lessonsUploadDispatch = useDispatch();
  const lessonsUploadFiles = useSelector((state) => state.lessonsUpload.lessonFiles);

  const elementRef = useRef();
  const elementDropRef = useRef();

  const setLessonsAddedWrapper = ({ file }) => {
    const { name, size, uniqueIdentifier, lastModified, type } = file;

    lessonsUploadDispatch(
      createLessonsAddedListAction({ name, size, uniqueIdentifier, lastModified, type }),
    );
  };

  const setLessonsProgressWrapper = ({ file, progress }) => {
    lessonsUploadDispatch(
      createLessonsProgressObjAction({
        uniqueIdentifier: file.uniqueIdentifier,
        progress: progress,
      }),
    );
  };
  const setLessonsSuccessWrapper = ({ file, response }) => {
    const { uniqueIdentifier } = file;

    lessonsUploadDispatch(createLessonsSuccessObjAction({ uniqueIdentifier, success: true }));
  };
  const setLessonsErrorWrapper = ({ file, response }) => {
    const { uniqueIdentifier } = file;
    const { message } = response;

    lessonsUploadDispatch(createLessonsErrorObjAction({ uniqueIdentifier, error: message }));
  };

  // resubeable effect
  useEffect(() => {
    // console.log('resumableUpload effect called');
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
      onSuccess: setLessonsSuccessWrapper,
      onError: setLessonsErrorWrapper,
    });
  }, [courseId, chapterId]);

  return (
    <>
      <Flex ref={elementRef} w="100%" justify="end" align="center" py={12}>
        <ButtonWhite leftIcon={<BsUpload size={18} />}>Upload Lessons</ButtonWhite>
      </Flex>

      <Stack>
        {lessonsUploadFiles.addedFiles.length > 0 &&
          lessonsUploadFiles.addedFiles.map((addedFile) => (
            <LessonsRingProgress key={addedFile.uniqueIdentifier} addedFile={addedFile} />
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