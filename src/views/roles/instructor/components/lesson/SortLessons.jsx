import { useEffect, useState } from 'react';
import { Flex, Stack, Title, Loader, Text, Group } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { Button, ButtonWhite, NotFoundImage } from '@/components';
import { useGetLessonsQuery, useSortLessonsMutation } from '@/views/roles/instructor/api';
import { FiRefreshCw, FaSave, IconX, IconCheck } from '@/components/icons';
import DragDropLessons from './DragDropLessons';

export function SortLessons({ chapterId }) {
  const [sortLessons, setSortLessons] = useState(null);

  const {
    isSuccess: isGetLessonsSuccess,
    isFetching: isGetLessonsFetching,
    isError: isGetLessonsError,
    data: lessons,
    refetch: refetchLessons,
  } = useGetLessonsQuery(chapterId);

  console.log('SortLessons sortLessons======', lessons);

  const [
    sortLessonsData,
    {
      isSuccess: isSortLessonsSuccess,
      isLoading: isSortLessonsLoading,
      isError: isSortLessonsError,
      error: sortLessonsError,
    },
  ] = useSortLessonsMutation();

  useEffect(() => {
    if (isSortLessonsSuccess) {
      showNotification({
        id: 'sortLessonsSuccess',
        autoClose: 3000,
        title: 'Lessons sorted successfully',
        message: `Lessons has been sorted and saved.`,
        color: 'teal',
        icon: <IconCheck />,
        loading: false,
      });
    }
  }, [isSortLessonsSuccess]);

  useEffect(() => {
    if (!isGetLessonsFetching) {
      setSortLessons(lessons);
    }
  }, [!isGetLessonsFetching]);

  const onSubmitHandle = () => {
    if (!sortLessons) return;
    const finalSortLessons = sortLessons.map((lesson, index) => ({
      lesson_id: lesson.id,
      sort: index + 1,
    }));
    console.log('finalSortLessons : ', finalSortLessons);
    sortLessonsData({ lessons: finalSortLessons });
  };

  return (
    <>
      <Flex w="100%" justify="space-between" align="center" py={12}>
        <Title order={4}>Drag & Drop to sort lessons</Title>
        <Group gap={8}>
          <ButtonWhite leftIcon={<FiRefreshCw size={18} />} onClick={refetchLessons}>
            Refresh
          </ButtonWhite>
          <Button
            onClick={onSubmitHandle}
            color="lmsLayout"
            leftIcon={<FaSave size={18} />}
            loading={isSortLessonsLoading}
          >
            save
          </Button>
        </Group>
      </Flex>

      <Stack
        justify="center"
        align="center"
        sx={(theme) => ({
          width: '100%',
          height: '100%',
        })}
      >
        {isSortLessonsError && (
          <Flex align="center" justify="center" sx={(theme) => ({ color: theme.colors.red[5] })}>
            <IconX size={16} />
            <Text>
              Error:{' '}
              {typeof sortLessonsError.errors == 'string'
                ? sortLessonsError.errors
                : 'lessons could not be sorted, please try later.'}
            </Text>
          </Flex>
        )}
        {isGetLessonsFetching && (
          <Flex align="center" justify="center" p={50}>
            <Loader size="md" />
          </Flex>
        )}
        <Flex direction="column" p={4} mt={16} w="70%" mx="auto">
          {isGetLessonsSuccess && sortLessons?.length > 0 && (
            <DragDropLessons items={sortLessons} setitems={setSortLessons} />
          )}
        </Flex>

        {isGetLessonsSuccess && sortLessons?.length <= 0 && (
          <NotFoundImage
            width={450}
            message="There are no lessons for this chapter, create chapters then sort lessons"
          />
        )}

        {isGetLessonsError && (
          <Flex align="center" justify="center" sx={(theme) => ({ color: theme.colors.red[5] })}>
            <IconX size={16} />
            <Text>Error to load Lessons, Please refresh browser.</Text>
          </Flex>
        )}
      </Stack>
    </>
  );
}

export default SortLessons;
