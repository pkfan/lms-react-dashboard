import { useEffect, useState, useRef } from 'react';
import { Flex, Stack, Title, Box, Loader, Text } from '@mantine/core';
import { FiRefreshCw } from 'react-icons/fi';
import { IconX } from '@tabler/icons';

import Button from '@/components/common/Button';
import ButtonWhite from '@/components/common/ButtonWhite';
import LessonsCard from './LessonsCard';
import NotFoundImage from '@/components/images/NotFoundImage';

import { useGetLessonsQuery } from '@/views/roles/instructor/api';

export function AllLessons({ chapterId }) {
  const {
    isSuccess: isGetLessonsSuccess,
    isFetching: isGetLessonsFetching,
    isError: isGetLessonsError,
    data: lessons,
    refetch: refetchLessons,
  } = useGetLessonsQuery(chapterId);

  // console.log('lessons======', lessons);

  return (
    <>
      <Flex w="100%" justify="space-between" align="center" py={12}>
        <Title order={4}>Total Lessons: {lessons?.length}</Title>
        <Box>
          <ButtonWhite leftIcon={<FiRefreshCw size={18} />} onClick={refetchLessons}>
            Refresh
          </ButtonWhite>
        </Box>
      </Flex>

      <Stack
        justify="center"
        align="center"
        sx={(theme) => ({
          width: '100%',
          height: '100%',
        })}
      >
        {isGetLessonsFetching && (
          <Flex align="center" justify="center" p={50}>
            <Loader size="md" />
          </Flex>
        )}
        <Flex direction="column" p={16} mt={16} gap={36} w="85%" mx="auto">
          {isGetLessonsSuccess &&
            lessons.length > 0 &&
            lessons.map((lesson) => (
              <LessonsCard key={lesson.id} lesson={lesson} refetchLessons={refetchLessons} />
            ))}
        </Flex>

        {isGetLessonsSuccess && lessons?.length <= 0 && (
          <NotFoundImage
            width={450}
            message="There are no lessons for this chapter, create chapters then upload lessons"
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

export default AllLessons;
