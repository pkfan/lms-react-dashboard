import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Flex, Stack, Title, Box } from '@mantine/core';
import { ButtonWhite } from '@/components';
import config from '@/config';
import { resumableUpload } from '@/helpers';
import {
  createLessonsAddedList as createLessonsAddedListAction,
  createLessonsProgressObj as createLessonsProgressObjAction,
  createLessonsSuccessObj as createLessonsSuccessObjAction,
  createLessonsErrorObj as createLessonsErrorObjAction,
  clearUploadLessonsData as clearUploadLessonsDataAction,
} from '@/views/roles/instructor/slice/lessonsUploadSlice';
import { FaCloudUploadAlt, FiRefreshCw } from '@/components/icons';
import LessonsRingProgress from './LessonsRingProgress';

export function UploadLessons({ courseId, chapterId, setReInitResumeable }) {
  const lessonsUploadDispatch = useDispatch();
  const lessonsUploadFiles = useSelector((state) => state.lessonsUpload.lessonFiles);

  // const elementRef = useRef();
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
    // const divElement = elementRef.current;
    const divDropElement = elementDropRef.current;

    // if (divElement) {
    //   divElement.setAttribute('resumableuploadcall', 'false');
    // }
    // console.log('divElement', divElement);

    const lessonsUploadRelativeUrl = `/instructor/course/lesson/upload/${courseId}/${chapterId}`;

    resumableUpload({
      domElement: divDropElement,
      domDropElement: divDropElement,
      url: config.baseUrl + lessonsUploadRelativeUrl,
      maxFiles: 10,
      maxFileSize: '1500-MB',
      fileExtenstions: [], // allow all extensions for lessons
      onAdded: setLessonsAddedWrapper,
      onProgress: setLessonsProgressWrapper,
      onSuccess: setLessonsSuccessWrapper,
      onError: setLessonsErrorWrapper,
    });
  }, [courseId, chapterId]);

  const refreshToClearStoreLessons = () => {
    lessonsUploadDispatch(clearUploadLessonsDataAction());
    setReInitResumeable(true);

    setTimeout(() => {
      setReInitResumeable(false);
    }, 1000);
  };

  return (
    <>
      <Flex w="100%" justify="end" align="center" py={12}>
        <Box>
          <ButtonWhite leftIcon={<FiRefreshCw size={18} />} onClick={refreshToClearStoreLessons}>
            Clear
          </ButtonWhite>
        </Box>
      </Flex>

      <Flex direction="column" p={16} mt={16} gap={36} w="85%" mx="auto">
        {lessonsUploadFiles.addedFiles.length > 0 &&
          lessonsUploadFiles.addedFiles.map((addedFile) => (
            <LessonsRingProgress key={addedFile.uniqueIdentifier} addedFile={addedFile} />
          ))}
      </Flex>

      <Stack
        justify="center"
        align="center"
        ref={elementDropRef}
        sx={(theme) => ({
          cursor: 'pointer',
          color: theme.colors.lmsPrimary[6],
          width: '100%',
          height: '100%',
        })}
      >
        <FaCloudUploadAlt size={150} />
        <Title order={4}>Choose OR Drag & Drop Lessons.</Title>
      </Stack>
    </>
  );
}

export default UploadLessons;
