import _ from 'lodash';
import { useState, useEffect, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  Title,
  Stack,
  Box,
  Popover,
  TextInput,
  Group,
  Button as MantineButton,
  Loader,
  Flex,
  Text,
  Image,
  Menu,
  ActionIcon,
} from '@mantine/core';

import { useDisclosure } from '@mantine/hooks';
import { showNotification } from '@mantine/notifications';
import { formatDistance } from 'date-fns';

import {
  Button,
  RightDrawer,
  Paper,
  PageTitle,
  ConfuseImage,
  ReactDataTable,
  StarsRating,
  DeleteModal,
  ConfirmPasswordModal,
} from '@/components';

import {
  getImageUrl,
  getDimensionImageUrl,
  liveStatusAndColor,
  statusAndColor,
  randomNumber,
} from '@/helpers';

import {
  showLoadingNotification,
  updateLoadingNotificationError,
  updateLoadingNotificationSuccess,
} from '@/helpers/notification';

import { Query } from '@/lib/cogent-js';
import { CourseInstructorLiveStatus, CourseInstructorStatus } from '@/enums';

import {
  useGetInvitesCoursesQuery,
  useUpdateInviteCourseMutation,
} from '@/views/education/instructor/api';

import { useSelector } from 'react-redux';

import { SiAddthis, ImEye, IconDotsVertical, IconCheck, IconX } from '@/components/icons';
import { usePermissions } from '@/hooks';

import InviteCourseDetailCards from './InviteCourseDetailCards';

export function InviteCourseList() {
  const { hasPermission } = usePermissions();

  const [requestCourseId, setRequestCourseId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(50);

  // course action
  const [
    courseAction,
    {
      isSuccess: isCourseActionSuccess,
      isLoading: isCourseActionLoading,
      isError: isCourseActionError,
      error: courseActionError,
    },
  ] = useUpdateInviteCourseMutation();

  useEffect(() => {
    if (isCourseActionSuccess) {
      showNotification({
        id: 'isCourseActionSuccess',
        autoClose: 6000,
        title: 'Success',
        message: 'Course action completed.',
        color: 'teal',
        icon: <IconCheck />,
        loading: false,
      });
    }

    if (isCourseActionError) {
      const error = _.isObject(courseActionError.errors)
        ? 'data is invalid.'
        : courseActionError.errors;
      showNotification({
        id: 'isCourseActionError',
        autoClose: 6000,
        title: 'Error!!!',
        message: error,
        color: 'red',
        icon: <IconX />,
        loading: false,
      });
    }
  }, [isCourseActionSuccess, isCourseActionError]);

  const columns = useMemo(() => [
    {
      name: 'Action',
      selector: (row) => (
        <Box>
          <Menu shadow="md" position="right" offset={-5} withArrow arrowPosition="center">
            <Menu.Target>
              <ActionIcon
                loading={row.id == requestCourseId && isCourseActionLoading}
                sx={(theme) => ({ '&:hover': { backgroundColor: theme.colors.lmsLayout[1] } })}
              >
                <IconDotsVertical size={20} />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item
                icon={<ImEye size={14} style={{ opacity: 0.6 }} />}
                onClick={() => {
                  // setRequestCourseId(row.id);
                  // updateInviteCourse({ course_id: row.id, status: CourseInstructorStatus.APPROVE });
                }}
              >
                View
              </Menu.Item>
              {hasPermission('accept course invitation', 'instructor') && (
                <Menu.Item
                  color="teal"
                  icon={<IconCheck size={14} style={{ opacity: 0.6 }} />}
                  onClick={() => {
                    setRequestCourseId(row.id);
                    courseAction({ course_id: row.id, status: 'accept' });
                  }}
                >
                  Accept
                </Menu.Item>
              )}
              {hasPermission('reject course invitation', 'instructor') && (
                <Menu.Item
                  color="red"
                  icon={<IconX size={14} style={{ opacity: 0.6 }} />}
                  onClick={() => {
                    setRequestCourseId(row.id);
                    courseAction({ course_id: row.id, status: 'reject' });
                  }}
                >
                  Reject
                </Menu.Item>
              )}
            </Menu.Dropdown>
          </Menu>
        </Box>
      ),
      // sortable: true,
      maxWidth: '40px',
      minWidth: '40px',
      compact: true,
    },

    {
      name: 'Thumbnail',
      selector: (row) => (
        <Image
          src={row.thumbnail ? getImageUrl(row.thumbnail) : getDimensionImageUrl('640X360')}
          width={150}
          py={8}
        />
      ),
      maxWidth: '165px',
      minWidth: '165px',
    },
    {
      name: 'Title',
      selector: (row) => row.title,
      // sortable: true,
      maxWidth: '350px',
      minWidth: '350px',
    },
    {
      name: 'Instructors',
      selector: (row) =>
        row.not_rejected_instructors.map((instructor) => (
          <Text key={instructor.id}>{instructor.full_name}</Text>
        )),
      // sortable: true,
      maxWidth: '150px',
      minWidth: '150px',
    },
    {
      name: 'Chapters',
      selector: (row) => row.chapters_count,
      // sortable: true,
      maxWidth: '90px',
      minWidth: '90px',
      compact: true,
    },
    {
      name: 'Lessons',
      selector: (row) => row.lessons_count,
      // sortable: true,
      maxWidth: '90px',
      minWidth: '90px',
      compact: true,
    },
    {
      name: 'Duration',
      selector: (row) => row.videos_sum_duration || 'N/A',
      // sortable: true,
      maxWidth: '90px',
      minWidth: '90px',
      compact: true,
    },
    {
      name: 'Attachments',
      selector: (row) => row.attachments_count || 'N/A',
      // sortable: true,
      maxWidth: '90px',
      minWidth: '90px',
      compact: true,
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
        return row.discount ? `Rs ${discountPrice.toFixed(2)}` : 'FREE';
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
      name: 'Comments',
      selector: (row) => row.comments || 0,
      // sortable: true,
      maxWidth: '90px',
      minWidth: '90px',
      compact: true,
    },
    {
      name: 'Invited',
      selector: (row) =>
        row.pivot.created_at
          ? formatDistance(new Date(row.pivot.created_at), new Date(), {
              addSuffix: true,
            })
          : 'N/A',
      // sortable: true,
      maxWidth: '140px',
      minWidth: '140px',
      compact: true,
    },
  ]);

  const generateUrlQuery = useCallback(() => {
    const query = new Query();
    let urlQuery = query.for('instructor/courses/invites'); // the model you're selecting
    // .where('title', 'me')

    urlQuery
      .includes(
        'instructors',
        'chaptersCount',
        'lessonsCount',
        'videos_sum_duration',
        'attachmentsCount',
        'thumbnail',
      )
      .page(currentPage)
      .params({
        rowsPerPage,
        paginate: 'true',
      });

    urlQuery = urlQuery.get();

    console.log('Query urlQuery::::: ', urlQuery);
    // alert('app loaded');

    return urlQuery;
  }, [currentPage, rowsPerPage]);

  const {
    isSuccess: isGetCoursesSuccess,
    isFetching: isGetCoursesFetching,
    isError: isGetCoursesError,
    data: coursesWithDetailData,
  } = useGetInvitesCoursesQuery({ url: generateUrlQuery() }); //force to refetch

  const handlePageChange = (page) => {
    // console.log('handlePageChange', page);
    setCurrentPage(page);
  };

  const handlePerRowsChange = (rows, page) => {
    // console.log('handlePerRowsChange', rows, page);
    setRowsPerPage(rows);
    setCurrentPage(1);
  };

  return (
    <>
      <Stack sx={{ width: '100%' }}>
        {/* <MainLoadingOverlay visibleOvarlay={visibleOvarlay} /> */}

        <PageTitle title="Course Invitation">
          <Group>
            <Button compact component={Link} to="#" leftIcon={<SiAddthis size={16} />}>
              Add New
            </Button>
          </Group>
        </PageTitle>

        <InviteCourseDetailCards />

        <Paper
          sx={{ position: 'relative', zIndex: 0, paddingTop: '48px!important', minHeight: 400 }}
        >
          {isGetCoursesFetching && (
            <Stack justify="center" align="center" sx={{ padding: 24, width: '100%' }}>
              <Loader size="md" my={50} />
            </Stack>
          )}
          {isGetCoursesError && (
            <Flex align="center" justify="center" sx={(theme) => ({ color: theme.colors.red[5] })}>
              <IconX size={16} />
              <Text>Error to load, Please refresh browser.</Text>
            </Flex>
          )}
          {isGetCoursesSuccess && coursesWithDetailData.data.length <= 0 && (
            <Stack justify="center" align="center" sx={{ width: '100%' }}>
              <ConfuseImage width={450} message="" />
            </Stack>
          )}
          {/* {isGetCoursesSuccess && coursesWithDetailData.data.length > 0 && ( */}
          <ReactDataTable
            columns={columns}
            data={coursesWithDetailData?.data}
            keyField="id"
            fixedHeader
            highlightOnHover
            responsive
            progressPending={isGetCoursesFetching}
            ////////
            pagination
            paginationServer
            paginationTotalRows={coursesWithDetailData?.meta.total || 0}
            paginationDefaultPage={currentPage}
            paginationPerPage={50}
            paginationRowsPerPageOptions={[50, 75, 100, 150, 200]}
            onChangeRowsPerPage={handlePerRowsChange}
            onChangePage={handlePageChange}
          />
          {/* )} */}
        </Paper>
      </Stack>
    </>
  );
}

export default InviteCourseList;
