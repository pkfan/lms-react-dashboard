import { Group, Text, useMantineTheme } from '@mantine/core';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { usePostTestMutation } from '../../api';
import { IconUpload, IconPhoto, IconX } from '@/components/icons';

export function DropZone(props) {
  const [
    postTest,
    {
      isLoading: isPostTestLoading,
      isSuccess: isPostTestSuccess,
      error: PostTestError,
      isError: isPostTestError,
    },
  ] = usePostTestMutation();

  const theme = useMantineTheme();
  return (
    <Dropzone
      onDrop={(files) => {
        console.log('accepted files', files);
        postTest(files[0]);
      }}
      onReject={(files) => console.log('rejected files', files)}
      maxSize={3 * 1024 ** 2}
      accept={IMAGE_MIME_TYPE}
      {...props}
    >
      <Group position="center" spacing="xl" style={{ minHeight: 220, pointerEvents: 'none' }}>
        <Dropzone.Accept>
          <IconUpload
            size={50}
            stroke={1.5}
            color={theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 6]}
          />
        </Dropzone.Accept>
        <Dropzone.Reject>
          <IconX
            size={50}
            stroke={1.5}
            color={theme.colors.red[theme.colorScheme === 'dark' ? 4 : 6]}
          />
        </Dropzone.Reject>
        <Dropzone.Idle>
          <IconPhoto size={50} stroke={1.5} />
        </Dropzone.Idle>

        <div>
          <Text size="xl" inline>
            Drag images here or click to select files
          </Text>
          <Text size="sm" color="dimmed" inline mt={7}>
            Attach as many files as you like, each file should not exceed 5mb
          </Text>
        </div>
      </Group>
    </Dropzone>
  );
}

export default DropZone;
