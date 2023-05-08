import { Grid, Flex, Loader, Text } from '@mantine/core';
import { useGetInviteCoursesCountQuery } from '@/views/education/instructor/api';
import { DetailCardCount } from '@/components';
import {
  IconX,
  MdFolderShared
} from '@/components/icons';

export function InviteCourseDetailCards() {
  const {
    isSuccess: isGetCoursesCountSuccess,
    isFetching: isGetCoursesCountFetching,
    isError: isGetCoursesCountError,
    data: coursesCountData,
    // refetch: getCategoriesRefetch,
  } = useGetInviteCoursesCountQuery();

  return (
    <>
      {isGetCoursesCountFetching && (
        <Flex align="center" justify="center">
          <Loader size="sm" />
        </Flex>
      )}
      {isGetCoursesCountError && (
        <Flex align="center" justify="center" sx={(theme) => ({ color: theme.colors.red[5] })}>
          <IconX size={16} />
          <Text>Error to load, Please refresh browser.</Text>
        </Flex>
      )}
      {isGetCoursesCountSuccess && (
        <Grid my={8}>
          <DetailCardCount
            md={6}
            lg={3}
            title="Total Course Invitations"
            count={coursesCountData.invite_courses_count.total}
            icon={<MdFolderShared size={48} />}
            color="lmsPrimary"
          />
        </Grid>
      )}
    </>
  );
}

export default InviteCourseDetailCards;
