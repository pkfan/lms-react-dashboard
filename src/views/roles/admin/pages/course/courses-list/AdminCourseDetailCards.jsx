import { Grid, Flex, Loader, Text } from '@mantine/core';
import { useGetCoursesCountQuery } from '@/views/roles/admin/api';
import { DetailCardCount as AdminCourseDetailCard } from '@/components';
import {
  IconX,
  IconCheckbox,
  MdOutlineVideoLibrary,
  RiDraftLine,
  BsWatch,
  ImEye,
  ImEyeBlocked,
  ImCancelCircle,
  ImBlocked,
} from '@/components/icons';

export function AdminCourseDetailCards({ submitViaCourseCard }) {
  const {
    isSuccess: isGetCoursesCountSuccess,
    isFetching: isGetCoursesCountFetching,
    isError: isGetCoursesCountError,
    data: coursesCountData,
    // refetch: getCategoriesRefetch,
  } = useGetCoursesCountQuery();

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
          <Text>Error to load instructors, Please refresh browser.</Text>
        </Flex>
      )}
      {isGetCoursesCountSuccess && (
        <Grid my={8}>
          <AdminCourseDetailCard
            md={6}
            lg={3}
            title="Total Courses"
            count={coursesCountData.courses_count.total}
            icon={<MdOutlineVideoLibrary size={48} />}
            color="lmsPrimary"
            onClick={() => submitViaCourseCard('total')}
          />
          <AdminCourseDetailCard
            md={6}
            lg={3}
            title="Publish Courses"
            count={coursesCountData.courses_count.publish}
            icon={<ImEye size={48} />}
            color="teal"
            onClick={() => submitViaCourseCard('publish')}
          />
          <AdminCourseDetailCard
            md={6}
            lg={3}
            title="Private Courses"
            count={coursesCountData.courses_count.private}
            icon={<ImEyeBlocked size={48} />}
            color="lmsLayout"
            onClick={() => submitViaCourseCard('private')}
          />
          <AdminCourseDetailCard
            md={6}
            lg={3}
            title="Draft Courses"
            count={coursesCountData.courses_count.draft}
            icon={<RiDraftLine size={48} />}
            color="orange"
            onClick={() => submitViaCourseCard('draft')}
          />
          <AdminCourseDetailCard
            md={6}
            lg={3}
            title="Approved Courses"
            count={coursesCountData.courses_count.approved}
            icon={<IconCheckbox size={48} />}
            color="green"
            onClick={() => submitViaCourseCard('approved')}
          />
          <AdminCourseDetailCard
            md={6}
            lg={3}
            title="Pending Courses"
            count={coursesCountData.courses_count.pending}
            icon={<BsWatch size={48} />}
            color="yellow"
            onClick={() => submitViaCourseCard('pending')}
          />
          <AdminCourseDetailCard
            md={6}
            lg={3}
            title="Rejected Courses"
            count={coursesCountData.courses_count.rejected}
            icon={<ImCancelCircle size={48} />}
            color="pink"
            onClick={() => submitViaCourseCard('reject')}
          />
          <AdminCourseDetailCard
            md={6}
            lg={3}
            title="Blocked Courses"
            count={coursesCountData.courses_count.blocked}
            icon={<ImBlocked size={48} />}
            color="red"
            onClick={() => submitViaCourseCard('blocked')}
          />
        </Grid>
      )}
    </>
  );
}

export default AdminCourseDetailCards;
