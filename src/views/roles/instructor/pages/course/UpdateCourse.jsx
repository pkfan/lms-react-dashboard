import { useState } from 'react';
import CreateUpdateCourse from './CreateUpdateCourse';
import { Stack, Title, Loader, Flex } from '@mantine/core';
import { useParams } from 'react-router-dom';
import { useGetCourseQuery } from '../../api';
import { BiError } from 'react-icons/bi';

export function UpdateCourse() {
  // const [course, setCourse] = useState(null);

  const courseId = useParams().id;

  const {
    isSuccess: isGetCourseSuccess,
    isFetching: isGetCourseFetching,
    isError: isGetCourseError,
    data: getCourseData,
    // error: getCourseError,
  } = useGetCourseQuery(courseId);

  console.log('======== getCourseData', getCourseData);

  return (
    <>
      {isGetCourseError && (
        <Stack
          justify="center"
          align="center"
          sx={(theme) => ({ color: theme.colors.red[5], padding: 30, width: '100%' })}
        >
          <BiError size={150} />
          <Title order={4}>Error to load course, please refresh browser.</Title>
        </Stack>
      )}
      {isGetCourseFetching && (
        <Flex justify="center" align="center" w="100%" pt={150}>
          <Loader />
        </Flex>
      )}
      {isGetCourseSuccess && <CreateUpdateCourse course={getCourseData} />};
    </>
  );
}

export default UpdateCourse;
