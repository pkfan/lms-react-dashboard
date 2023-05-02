import { Grid, Flex, Loader, Text } from '@mantine/core';
import { useGetTrashCoursesCountQuery } from '@/views/education/instructor/api';
import { DetailCardCount } from '@/components';
import { IconX, FiTrash2 } from '@/components/icons';

export function TrashCourseDetailCards({ submitViaCourseCard }) {
  const {
    isSuccess: isGetTrashCoursesCountSuccess,
    isFetching: isGetTrashCoursesCountFetching,
    isError: isGetTrashCoursesCountError,
    data: coursesTrashCountData,
    // refetch: getCategoriesRefetch,
  } = useGetTrashCoursesCountQuery();

  return (
    <>
      {isGetTrashCoursesCountFetching && (
        <Flex align="center" justify="center">
          <Loader size="sm" />
        </Flex>
      )}
      {isGetTrashCoursesCountError && (
        <Flex align="center" justify="center" sx={(theme) => ({ color: theme.colors.red[5] })}>
          <IconX size={16} />
          <Text>Error to load, Please refresh browser.</Text>
        </Flex>
      )}
      {isGetTrashCoursesCountSuccess && (
        <Grid my={8}>
          <DetailCardCount
            md={6}
            lg={3}
            title="Total Trash Courses"
            count={coursesTrashCountData.trash_courses_count.total}
            icon={<FiTrash2 size={48} />}
            color="red"
            onClick={() => submitViaCourseCard('total')}
          />
        </Grid>
      )}
    </>
  );
}

export default TrashCourseDetailCards;
