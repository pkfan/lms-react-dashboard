import { Flex, Loader, Text, Box, Title } from '@mantine/core';
import { useState, useEffect } from 'react';
import { Link, useSearchParams, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import CourseCard from './CourseCard';
import Button from '@/components/common/Button';
import Overlay from '@/components/common/Overlay';
import Pagination from '@/components/common/Pagination';
import ButtonWhite from '@/components/common/ButtonWhite';
import { useGetCoursesWithDetailQuery } from '@/views/roles/instructor/api';
import NotFoundImage from '@/components/images/NotFoundImage';
import { FiRefreshCw } from 'react-icons/fi';
import { IconX } from '@tabler/icons';

export function CourseList({ tab, page, search, setPageWithScroll }) {
  const {
    isSuccess: isGetCoursesWithDetailSuccess,
    isFetching: isGetCoursesWithDetailFetching,
    isError: isGetCoursesWithDetailError,
    data: getCoursesWithDetail,
    refetch: getCoursesWithDetailRefetch,
  } = useGetCoursesWithDetailQuery({ page, search, tab });

  return (
    <Box sx={{ position: 'relative' }}>
      <Flex w="100%" justify="space-between" align="center" py={12}>
        <Title order={4}>Total: {getCoursesWithDetail?.meta.total}</Title>
        <Box>
          <ButtonWhite leftIcon={<FiRefreshCw size={18} />} onClick={getCoursesWithDetailRefetch}>
            Refresh
          </ButtonWhite>
        </Box>
      </Flex>
      {isGetCoursesWithDetailFetching && (
        <>
          <Flex
            align="center"
            justify="center"
            sx={{ position: 'relative', zIndex: 1000, padding: '12px 0' }}
          >
            <Loader size="md" />
          </Flex>
          <Overlay />
        </>
      )}
      {isGetCoursesWithDetailError && (
        <Flex align="center" justify="center" sx={(theme) => ({ color: theme.colors.red[5] })}>
          <IconX size={16} />
          <Text>Error to load courses, Please refresh browser.</Text>
        </Flex>
      )}
      {isGetCoursesWithDetailSuccess && (
        <Flex direction="column" p={16} mt={16} gap={36}>
          {getCoursesWithDetail.data.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
          {/* <CourseCard thumnail="https://designshack.net/wp-content/uploads/Digital-Marketing-YouTube-Thumbnail-Templates.jpg" />
          <CourseCard thumnail="https://designshack.net/wp-content/uploads/Digital-Marketing-YouTube-Thumbnail-Templates.jpg" /> */}
        </Flex>
      )}
      {isGetCoursesWithDetailSuccess && getCoursesWithDetail.meta.last_page > 1 && (
        <Pagination
          total={getCoursesWithDetail.meta.last_page}
          activePage={page}
          setPage={setPageWithScroll}
        />
      )}
      {isGetCoursesWithDetailSuccess && getCoursesWithDetail.meta.total <= 0 && (
        <NotFoundImage width={450} message={`There are no type of (${tab}) courses.`} />
      )}
    </Box>
  );
}

export default CourseList;
