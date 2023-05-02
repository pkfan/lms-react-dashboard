import { ThemeIcon, RingProgress, Text, Center, Grid, Stack, Title } from '@mantine/core';
import { useSelector } from 'react-redux';
import { formatDistance } from 'date-fns';
import { getExtensionFromFileName } from '@/helpers';
import { createFileSize } from '@/helpers/sizeFromBytes';
import { ExtensionFileSvg } from '@/components';
import { IconCheck, IconX } from '@/components/icons';

export function LessonsRingProgress({ addedFile }) {
  const lessonsUploadFiles = useSelector((state) => state.lessonsUpload.lessonFiles);
  const { filesProgress, filesSuccess, filesError } = lessonsUploadFiles;
  // select progress from store
  let progress = filesProgress[addedFile.uniqueIdentifier] || 0;
  let isSuccess = filesSuccess[addedFile.uniqueIdentifier];
  let isError = filesError[addedFile.uniqueIdentifier];

  let lastModified = formatDistance(new Date(addedFile.lastModified), new Date(), {
    addSuffix: true,
  });

  return (
    <>
      {/* <RingProgress
        sections={[{ value: 40, color: 'blue' }]}
        label={
          <Text color="blue" weight={700} align="center" size="xl">
            40%
          </Text>
        }
      /> */}

      {/* <RingProgress
        sections={[{ value: 100, color: 'teal' }]}
        label={
          <Center>
            <ThemeIcon color="teal" variant="light" radius="xl" size="xl">
              <IconCheck size={22} />
            </ThemeIcon>
          </Center>
        }
      /> */}

      <Grid
        sx={(theme) => ({
          border: `1px solid ${theme.colors.lmsLayout[3]}`,
          borderRadius: 16,
          position: 'relative',
          overflow: 'hidden',
          width: '100%',
        })}
      >
        <Grid.Col
          span={12}
          xs={2}
          sx={(theme) => ({
            backgroundColor: theme.colors.lmsPrimary[0],
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          })}
        >
          <Stack align="center" justify="center" spacing="xs">
            {/* <MdMenuBook size={48} style={{ opacity: 0.7 }} /> */}
            <ExtensionFileSvg
              extension={getExtensionFromFileName(addedFile.name)}
              size={60}
              style={{ opacity: 0.7 }}
            />
          </Stack>
        </Grid.Col>
        <Grid.Col
          span={12}
          xs={7}
          sx={(theme) => ({ backgroundColor: theme.colors.lmsSecondary[0] })}
        >
          <Stack spacing="xs">
            <Title order={5}> {addedFile.name}</Title>
            {!isError ? (
              <>
                <Text fz={12}>Size: {createFileSize(addedFile.size)}</Text>
                {/* <Text fz={12}>type: {addedFile.type}</Text> */}
                <Text fz={12}>Last Modified: {lastModified}</Text>
              </>
            ) : (
              <Text fz={12} color="red">
                Error: {isError}
              </Text>
            )}
          </Stack>
        </Grid.Col>
        <Grid.Col
          span={12}
          xs={3}
          sx={(theme) => ({
            borderLeft: `1px solid ${theme.colors.lmsLayout[1]}`,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme.colors.yellow[0],
          })}
        >
          {!isSuccess && !isError && (
            <RingProgress
              size={130}
              thickness={7}
              roundCaps
              sections={[{ value: progress, color: 'blue' }]}
              label={
                <Text color="blue" weight={700} align="center" fz={28}>
                  {progress}%
                </Text>
              }
            />
          )}
          {isSuccess && (
            <RingProgress
              size={130}
              thickness={7}
              roundCaps
              sections={[{ value: 100, color: 'teal' }]}
              label={
                <Center>
                  <ThemeIcon color="teal" variant="light" radius="xl" size="xl">
                    <IconCheck size={46} />
                  </ThemeIcon>
                </Center>
              }
            />
          )}
          {isError && (
            <RingProgress
              size={130}
              thickness={7}
              roundCaps
              sections={[{ value: 100, color: 'red' }]}
              label={
                <Center>
                  <ThemeIcon color="red" variant="light" radius="xl" size="xl">
                    <IconX size={46} />
                  </ThemeIcon>
                </Center>
              }
            />
          )}
        </Grid.Col>
      </Grid>
    </>
  );
}

export default LessonsRingProgress;
