import { useEffect, useRef } from 'react';
import { Flex, Stack, Title } from '@mantine/core';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { BsUpload } from 'react-icons/bs';
import ButtonWhite from '@/components/common/ButtonWhite';
import config from '@/config';
import resumableUpload from '@/helpers/resumableUpload';

export function UploadLessons({ courseId, chapterId }) {
  const elementRef = useRef();
  const elementDropRef = useRef();

  const onSuccess = () => console.log('onSuccess');
  const onError = () => console.log('onError');
  const onAdded = () => console.log('onAdded');
  const onProgress = () => console.log('onProgress');

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
      maxFiles: 1,
      maxFileSize: '500-MB',
      fileExtenstions: ['mp4'],
      onSuccess,
      onError,
      onAdded,
      onProgress,
    });
  }, [courseId, chapterId]);

  return (
    <>
      <Flex ref={elementRef} w="100%" justify="end" align="center" py={12}>
        <ButtonWhite leftIcon={<BsUpload size={18} />}>Upload Lessons</ButtonWhite>
      </Flex>

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
