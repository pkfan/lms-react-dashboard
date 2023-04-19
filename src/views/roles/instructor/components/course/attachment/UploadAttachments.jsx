import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Flex, Stack, Title, Box } from '@mantine/core';
import { ButtonWhite } from '@/components';
import config from '@/config';
import { resumableUpload } from '@/helpers';
import {
  createAddedList as createAddedListAction,
  createProgressObj as createProgressObjAction,
  createSuccessObj as createSuccessObjAction,
  createErrorObj as createErrorObjAction,
  clearUploadData as clearUploadDataAction,
} from '@/views/roles/instructor/slice/filesUploadSlice';
import { FaCloudUploadAlt, FiRefreshCw } from '@/components/icons';
import FileRingProgress from './FileRingProgress';

export function UploadAttachments({ courseId, setReInitResumeable }) {
  const filesUploadDispatch = useDispatch();
  const uploadFiles = useSelector((state) => state.filesUpload.files);

  // const elementRef = useRef();
  const elementDropRef = useRef();

  const setFilesAddedWrapper = ({ file }) => {
    const { name, size, uniqueIdentifier, lastModified, type } = file;

    filesUploadDispatch(
      createAddedListAction({ name, size, uniqueIdentifier, lastModified, type }),
    );
  };

  const setProgressWrapper = ({ file, progress }) => {
    filesUploadDispatch(
      createProgressObjAction({
        uniqueIdentifier: file.uniqueIdentifier,
        progress: progress,
      }),
    );
  };
  const setSuccessWrapper = ({ file, response }) => {
    const { uniqueIdentifier } = file;

    filesUploadDispatch(createSuccessObjAction({ uniqueIdentifier, success: true }));
  };
  const setErrorWrapper = ({ file, response }) => {
    const { uniqueIdentifier } = file;
    const { message } = response;

    filesUploadDispatch(createErrorObjAction({ uniqueIdentifier, error: message }));
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

    const uploadRelativeUrl = `/instructor/course/attachment/upload/${courseId}`;

    resumableUpload({
      domElement: divDropElement,
      domDropElement: divDropElement,
      url: config.baseUrl + uploadRelativeUrl,
      maxFiles: 10,
      maxFileSize: '4000-MB',
      fileExtenstions: [], // allow all extensions for lessons
      onAdded: setFilesAddedWrapper,
      onProgress: setProgressWrapper,
      onSuccess: setSuccessWrapper,
      onError: setErrorWrapper,
    });
  }, [courseId]);

  const refreshToClearStoreFiles = () => {
    filesUploadDispatch(clearUploadDataAction());
    setReInitResumeable(true);

    setTimeout(() => {
      setReInitResumeable(false);
    }, 1000);
  };

  return (
    <>
      <Flex w="100%" justify="end" align="center" py={12}>
        <Box>
          <ButtonWhite leftIcon={<FiRefreshCw size={18} />} onClick={refreshToClearStoreFiles}>
            Clear
          </ButtonWhite>
        </Box>
      </Flex>

      <Flex direction="column" p={16} mt={16} gap={36} w="85%" mx="auto">
        {uploadFiles.addedFiles.length > 0 &&
          uploadFiles.addedFiles.map((addedFile) => (
            <FileRingProgress key={addedFile.uniqueIdentifier} addedFile={addedFile} />
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

export default UploadAttachments;
