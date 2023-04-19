import { useMemo, useState, useEffect } from 'react';
import { Box, Image, Flex, Loader, Title, Text, Menu, ActionIcon, Stack } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import {
  useGetInvitesCoursesQuery,
  useUpdateInviteCourseMutation,
} from '@/views/roles/instructor/api';
import { StarsRating, ReactDataTable, ButtonWhite, ConfuseImage } from '@/components';
import { getImageUrl, getDimensionImageUrl, statusAndColor, liveStatusAndColor } from '@/helpers';
import { formatDistance } from 'date-fns';
import { CourseInstructorStatus } from '@/enums';
import { IconDotsVertical, IconCheck, IconX, FiRefreshCw } from '@/components/icons';

export function CourseInviteInstructors() {
  const [requestCourseId, setRequestCourseId] = useState(null);

  const {
    data: inviteCourses,
    error: inviteCoursesError,
    isFetching: isInviteCoursesFetching,
    isSuccess: isInviteCoursesSuccess,
    isError: isInviteCoursesError,
    refetch: inviteCoursesRefetch,
  } = useGetInvitesCoursesQuery();

  const [
    updateInviteCourse,
    {
      isSuccess: isUpdateInviteCourseSuccess,
      isLoading: isUpdateInviteCourseLoading,
      isError: isUpdateInviteCourseError,
      error: updateInviteCourseError,
      // data: deleteCourseData,
    },
  ] = useUpdateInviteCourseMutation();

  useEffect(() => {
    if (isInviteCoursesError) {
      const error = _.isObject(inviteCoursesError.errors)
        ? 'data is invalid.'
        : inviteCoursesError.errors;
      showNotification({
        id: 'inviteCoursesError',
        autoClose: 6000,
        title: 'Error!!!',
        message: error,
        color: 'red',
        icon: <IconX />,
        loading: false,
      });
    }
    if (isUpdateInviteCourseError) {
      const error = _.isObject(updateInviteCourseError.errors)
        ? 'data is invalid.'
        : updateInviteCourseError.errors;
      showNotification({
        id: 'updateInviteCourseError',
        autoClose: 6000,
        title: 'Error!!!',
        message: error,
        color: 'red',
        icon: <IconX />,
        loading: false,
      });
    }
  }, [isInviteCoursesError, isUpdateInviteCourseError]);

  const columns = useMemo(() => [
    // {
    //   name: 'No',
    //   selector: (row) => row.id,
    // sortable: true,
    //   maxWidth: '50px',
    //   minWidth: '50px',
    //   compact: true,
    // },
    {
      name: 'Thumbnail',
      selector: (row) => (
        <Image
          src={row.thumbnail ? getImageUrl(row.thumbnail) : getDimensionImageUrl('640X360')}
          width={80}
          py={8}
        />
      ),
      maxWidth: '100px',
      minWidth: '100px',
    },
    {
      name: 'Title',
      selector: (row) => row.title,
      // sortable: true,
      maxWidth: '350px',
      minWidth: '350px',
    },

    {
      name: 'Price',
      selector: (row) => (row.price ? `Rs ${row.price}` : 'FREE'),
      // sortable: true,
      maxWidth: '100px',
      minWidth: '100px',
      compact: true,
    },

    {
      name: 'Discount Price',
      selector: (row) => {
        const PERCENTAGE = 100;
        const discountPrice = ((PERCENTAGE - row.discount) / PERCENTAGE) * row.price;
        return row.discount ? `Rs ${discountPrice.toFixed(2)}` : 0;
      },
      // sortable: true,
      maxWidth: '100px',
      minWidth: '100px',
      compact: true,
    },
    {
      name: 'Discount',
      selector: (row) => (row.discount ? row.discount : 0),
      // sortable: true,
      maxWidth: '80px',
      minWidth: '80px',
      compact: true,
    },

    {
      name: 'Access Days',
      selector: (row) => (row.access_days ? row.access_days : 'unlimited'),
      // sortable: true,
      maxWidth: '80px',
      minWidth: '80px',
      compact: true,
    },
    {
      name: 'Stars',
      selector: (row) => <StarsRating stars={row.stars} />,
      // sortable: true,
      maxWidth: '90px',
      minWidth: '90px',
      compact: true,
    },
    {
      name: 'Live Status',
      selector: (row) => (
        <Box
          sx={(theme) => ({
            backgroundColor: theme.colors[liveStatusAndColor(row).liveStatusColor][3],
            padding: '2px 8px',
            borderRadius: '100%',
            maxWidth: 'max-content',
            display: 'inline',
            color: '#000',
            fontWeight: 'bold',
            fontSize: 12,
          })}
        >
          {liveStatusAndColor(row).liveStatus}
        </Box>
      ),
      // sortable: true,
      maxWidth: '90px',
      minWidth: '90px',
      compact: true,
    },
    {
      name: 'Status',
      selector: (row) => (
        <Box
          sx={(theme) => ({
            backgroundColor: theme.colors[statusAndColor(row).statusColor][3],
            padding: '2px 8px',
            borderRadius: '100%',
            maxWidth: 'max-content',
            display: 'inline',
            color: '#000',
            fontWeight: 'bold',
            fontSize: 12,
          })}
        >
          {statusAndColor(row).status}
        </Box>
      ),
      // sortable: true,
      maxWidth: '90px',
      minWidth: '90px',
      compact: true,
    },
    {
      name: 'Invited',
      selector: (row) =>
        formatDistance(new Date(row.pivot.created_at), new Date(), {
          addSuffix: true,
        }),
      // sortable: true,
      maxWidth: '140px',
      minWidth: '140px',
      compact: true,
    },
    {
      name: 'Action',
      selector: (row) => (
        <Box>
          <Menu shadow="md" position="left" offset={-5} withArrow arrowPosition="center">
            <Menu.Target>
              <ActionIcon
                loading={row.id == requestCourseId && isUpdateInviteCourseLoading}
                sx={(theme) => ({ '&:hover': { backgroundColor: theme.colors.lmsLayout[1] } })}
              >
                <IconDotsVertical size={20} />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item
                color="teal"
                icon={<IconCheck size={14} />}
                onClick={() => {
                  setRequestCourseId(row.id);
                  updateInviteCourse({ course_id: row.id, status: CourseInstructorStatus.APPROVE });
                }}
              >
                Accept
              </Menu.Item>
              <Menu.Item
                color="red"
                icon={<IconX size={14} />}
                onClick={() => {
                  setRequestCourseId(row.id);
                  updateInviteCourse({ course_id: row.id, status: CourseInstructorStatus.REJECT });
                }}
              >
                Reject
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Box>
      ),
      // sortable: true,
      maxWidth: '80px',
      minWidth: '80px',
      compact: true,
    },
  ]);

  return (
    <>
      <Flex w="100%" justify="space-between" align="center" py={12}>
        <Title order={4}>Total Courses Invitations: {inviteCourses?.data?.length}</Title>
        <Box>
          <ButtonWhite leftIcon={<FiRefreshCw size={18} />} onClick={inviteCoursesRefetch}>
            Refresh
          </ButtonWhite>
        </Box>
      </Flex>
      {isInviteCoursesFetching && (
        <Stack justify="center" align="center" sx={{ padding: 24, width: '100%' }}>
          <Loader size="md" my={50} />
        </Stack>
      )}
      {isInviteCoursesError && (
        <Flex align="center" justify="center" sx={(theme) => ({ color: theme.colors.red[5] })}>
          <IconX size={16} />
          <Text>Error to load courses, Please refresh browser.</Text>
        </Flex>
      )}
      {isInviteCoursesSuccess && inviteCourses.data.length <= 0 && (
        <Stack justify="center" align="center" sx={{ width: '100%' }}>
          <ConfuseImage width={450} message="There is no course invitation" />
        </Stack>
      )}
      {isInviteCoursesSuccess && inviteCourses.data.length > 0 && (
        <ReactDataTable
          columns={columns}
          data={inviteCourses?.data}
          keyField="id"
          fixedHeader
          highlightOnHover
          responsive
          // selectableRows
          progressPending={isInviteCoursesFetching}
          // progressComponent={<Loader size="md" my={150} />}
          // persistTableHead
        />
      )}
    </>
  );
}

export default CourseInviteInstructors;
