import _ from 'lodash';
import { useEffect } from 'react';
import { Stack, Flex, Title, Divider, Text, Paper, Loader } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { useGetChaptersQuery, useCreateChapterMutation } from '@/views/roles/instructor/api';
import { NotFoundImage } from '@/components';
import { ChapterCard, ChapterCreateForm } from '@/views/roles/instructor/components';
import { IconCheck, IconX, BiError } from '@/components/icons';

export function Chapters({ course, refetchSteps }) {
  const {
    isSuccess: isGetChaptersSuccess,
    isFetching: isGetChaptersFetching,
    isError: isGetChaptersError,
    data: chapters,
    refetch: refetchChapters,
  } = useGetChaptersQuery(course.id);

  const [
    createChapter,
    {
      isSuccess: isCreateChapterSuccess,
      isLoading: isCreateChapterLoading,
      isError: isCreateChapterError,
      error: createChapterError,
    },
  ] = useCreateChapterMutation();

  useEffect(() => {
    if (isCreateChapterSuccess) {
      showNotification({
        id: 'createChapterSuccess',
        autoClose: 3000,
        title: `Chapter Created`,
        message: `Chapter has been created.`,
        color: 'teal',
        icon: <IconCheck />,
        loading: false,
      });
      refetchChapters();

      refetchSteps();
    }

    if (isCreateChapterError) {
      const error = _.isObject(createChapterError.errors)
        ? 'Input data is invalid.'
        : createChapterError.errors;

      showNotification({
        id: 'createChapterError',
        autoClose: 6000,
        title: 'Error!!!',
        message: error,
        color: 'red',
        icon: <IconX />,
        loading: false,
      });
    }
  }, [isCreateChapterSuccess, isCreateChapterError]);

  const onSubmitHandle = (values) => {
    values['course_id'] = course.id;
    console.log('chapters  values....', values);
    createChapter(values);
  };

  return (
    <>
      <Paper p="md" withBorder sx={{ borderLeftWidth: 0, borderRadius: 0 }}>
        <Flex w="100%" align="center" justify="space-between">
          <Text>
            <b>Course:</b> {course.title}
          </Text>
        </Flex>
        <Stack
          spacing="lg"
          py={16}
          align="center"
          justify="center"
          sx={(theme) => ({
            border: `1px solid ${theme.colors.lmsLayout[4]}`,
            borderRadius: 4,
            margin: 8,
            position: 'relative',
            width: '100%',
          })}
        >
          {isGetChaptersSuccess && (
            <ChapterCreateForm
              chapters={chapters}
              onSubmitHandle={onSubmitHandle}
              isChapterLoading={isCreateChapterLoading}
            />
          )}
          <Divider variant="dashed" w="100%" />
          {isGetChaptersSuccess && (
            <Title
              order={3}
              sx={{ justifySelf: 'flex-start', alignSelf: 'flex-start', paddingLeft: '32px' }}
            >
              All Chapters ({chapters?.length})
            </Title>
          )}

          <Flex direction="column" p={16} mt={16} gap={36} w="85%" mx="auto">
            {isGetChaptersError && (
              <Stack
                justify="center"
                align="center"
                sx={(theme) => ({ color: theme.colors.red[5], padding: 10, width: '100%' })}
              >
                <BiError size={150} />
                <Title order={4}>Error to load chapters, please refresh browser.</Title>
              </Stack>
            )}
            {isGetChaptersFetching && (
              <Flex justify="center" align="center" w="100%" pt={10}>
                <Loader />
              </Flex>
            )}
            {isGetChaptersSuccess &&
              chapters?.length > 0 &&
              chapters?.map((chapter) => (
                <ChapterCard key={chapter.id} chapter={chapter} refetchChapters={refetchChapters} />
              ))}

            {isGetChaptersSuccess && chapters?.length <= 0 && (
              <NotFoundImage width={450} message="Chapter not found." />
            )}
          </Flex>
        </Stack>
      </Paper>
    </>
  );
}

export default Chapters;
