import { Grid, Flex, Loader, Text } from '@mantine/core';
import Paper from '@/components/common/Paper';
import { useGetCoursesCountQuery } from '../../../api';
import AdminCourseDetailCard from './AdminCourseDetailCard';
// icons
import { IconX, IconCheckbox } from '@tabler/icons';
import { MdOutlineVideoLibrary } from 'react-icons/md';
import { RiDraftLine } from 'react-icons/ri';
import { BsWatch } from 'react-icons/bs';
import { FiTrash2 } from 'react-icons/fi';
import { ImEye, ImEyeBlocked, ImCancelCircle, ImBlocked } from 'react-icons/im';

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
            title="Total Courses"
            count={coursesCountData.courses_count.total}
            icon={<MdOutlineVideoLibrary size={48} />}
            color="lmsPrimary"
            onClick={() => submitViaCourseCard('total')}
          />
          <AdminCourseDetailCard
            title="Publish Courses"
            count={coursesCountData.courses_count.publish}
            icon={<ImEye size={48} />}
            color="teal"
            onClick={() => submitViaCourseCard('publish')}
          />
          <AdminCourseDetailCard
            title="Private Courses"
            count={coursesCountData.courses_count.private}
            icon={<ImEyeBlocked size={48} />}
            color="lmsLayout"
            onClick={() => submitViaCourseCard('private')}
          />
          <AdminCourseDetailCard
            title="Draft Courses"
            count={coursesCountData.courses_count.draft}
            icon={<RiDraftLine size={48} />}
            color="orange"
            onClick={() => submitViaCourseCard('draft')}
          />
          <AdminCourseDetailCard
            title="Approved Courses"
            count={coursesCountData.courses_count.approved}
            icon={<IconCheckbox size={48} />}
            color="green"
            onClick={() => submitViaCourseCard('approved')}
          />
          <AdminCourseDetailCard
            title="Pending Courses"
            count={coursesCountData.courses_count.pending}
            icon={<BsWatch size={48} />}
            color="yellow"
            onClick={() => submitViaCourseCard('pending')}
          />
          <AdminCourseDetailCard
            title="Rejected Courses"
            count={coursesCountData.courses_count.rejected}
            icon={<ImCancelCircle size={48} />}
            color="pink"
            onClick={() => submitViaCourseCard('reject')}
          />
          <AdminCourseDetailCard
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
