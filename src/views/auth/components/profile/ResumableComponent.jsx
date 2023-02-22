import { useRef, useEffect, useState } from 'react';
import config from '@/config';
import { RingProgress, Text, Box } from '@mantine/core';
import resumableUpload from '@/helpers/resumableUpload';

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
      <Box id="drag-drop-lessons" ref={elementRef}>
        image upload test
      </Box>
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
