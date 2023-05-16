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
  useGetCoursesQuery,
  useCourseActionMutation,
  useDeleteCourseMutation,
  useCoursesBulkActionMutation,
  useDeleteBulkCoursesMutation,
} from '@/views/education/admin/api';

import { useSelector } from 'react-redux';

import {
  SiAddthis,
  ImFilter,
  ImSearch,
  ImEye,
  ImEyeBlocked,
  IconDotsVertical,
  IconCheck,
  IconX,
  FaEdit,
  FaChevronDown,
  FiTrash2,
  RiDraftLine,
} from '@/components/icons';
import { usePermissions } from '@/hooks';

import AdminCourseFilter from './AdminCourseFilter';
import AdminCourseDetailCards from './AdminCourseDetailCards';

export function AdminCourseList() {
  const { hasPermission } = usePermissions();

  const [courseTitle, setCourseTitle] = useState('');
  const [instructorId, setInstructorId] = useState(null);
  const [coursePrice, setCoursePrice] = useState(null);
  const [courseDiscount, setCourseDiscount] = useState(null);
  const [courseStatus, setCourseStatus] = useState(null);
  const [courseLiveStatus, setCourseLiveStatus] = useState(null);
  const [courseStars, setCourseStars] = useState(null);
  const [courseComments, setCourseComments] = useState(null);
  const [courseAccessDays, setCourseAccessDays] = useState(null);
  const [coursePublished, setCoursePublished] = useState(null);
  const [courseContentUpdated, setCourseContentUpdated] = useState(null);
  const [courseCreated, setCourseCreated] = useState(null);
  const [courseUpdated, setCourseUpdated] = useState(null);
  const [courseSortField, setCourseSortField] = useState(null);
  const [courseSortSymbol, setCourseSortSymbol] = useState('-');

  const [submitFilter, setSubmitFilter] = useState(null);

  const [searchPopoverOpened, setSearchPopoverOpened] = useState(false);

  const [requestCourseId, setRequestCourseId] = useState(null);

  const [selectedCourses, setselectedCourses] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(50);

  const [openedRightFilter, { open: openRightFilter, close: closeRightFilter }] =
    useDisclosure(false);

  ///////////
  const [openedDeleteModal, { open: openDeleteModal, close: closeDeleteModal }] =
    useDisclosure(false);
  const [openedBulkDeleteModal, { open: openBulkDeleteModal, close: closeBulkDeleteModal }] =
    useDisclosure(false);
  // confirm password
  const isPasswordConfirm = useSelector((state) => state.authSlice.auth.isPasswordConfirm);

  console.log('=== isPasswordConfirm ===', isPasswordConfirm);

  const [
    openedConfirmPasswordModal,
    { open: openConfirmPasswordModal, close: closeConfirmPasswordModal },
  ] = useDisclosure(false);

  // delete course
  const [
    deleteCourse,
    {
      isSuccess: isDeleteCourseSuccess,
      isLoading: isDeleteCourseLoading,
      isError: isDeleteCourseError,
      error: deleteCourseError,
      // data: deleteCourseData,
    },
  ] = useDeleteCourseMutation();

  useEffect(() => {
    if (isDeleteCourseSuccess) {
      closeDeleteModal();
      setselectedCourses(null);
      showNotification({
        id: 'deleteCourseSuccess',
        autoClose: 6000,
        title: 'Success',
        message: 'Course has been deleted.',
        color: 'teal',
        icon: <IconCheck />,
        loading: false,
      });
    }

    if (isDeleteCourseError) {
      closeDeleteModal();
      const error = _.isObject(deleteCourseError.errors)
        ? 'data is invalid.'
        : deleteCourseError.errors;
      showNotification({
        id: 'deleteCourseError',
        autoClose: 6000,
        title: 'Error!!!',
        message: error,
        color: 'red',
        icon: <IconX />,
        loading: false,
      });
    }
  }, [isDeleteCourseSuccess, isDeleteCourseError]);

  const deleteActionWrapper = () => {
    if (!isPasswordConfirm) {
      openConfirmPasswordModal();
    } else {
      openDeleteModal();
    }
  };

  const confirmDelete = () => {
    deleteCourse({ course_id: requestCourseId });
  };

  // course action
  const [
    courseAction,
    {
      isSuccess: isCourseActionSuccess,
      isLoading: isCourseActionLoading,
      isError: isCourseActionError,
      error: courseActionError,
    },
  ] = useCourseActionMutation();

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

  //bulk course delete
  const [
    deleteBulkCourses,
    {
      isSuccess: isDeleteBulkCoursesSuccess,
      isLoading: isDeleteBulkCoursesLoading,
      isError: isDeleteBulkCoursesError,
      error: deleteBulkCoursesError,
      // data: DeleteBulkCoursesData,
    },
  ] = useDeleteBulkCoursesMutation();

  useEffect(() => {
    if (isDeleteBulkCoursesSuccess) {
      closeBulkDeleteModal();
      setselectedCourses(null);
      showNotification({
        id: 'deleteBulkCoursesSuccess',
        autoClose: 6000,
        title: 'Success',
        message: 'Bulk Courses have been deleted.',
        color: 'teal',
        icon: <IconCheck />,
        loading: false,
      });
    }

    if (isDeleteBulkCoursesError) {
      closeBulkDeleteModal();
      const error = _.isObject(deleteBulkCoursesError.errors)
        ? 'data is invalid.'
        : deleteBulkCoursesError.errors;
      showNotification({
        id: 'deleteBulkCoursesError',
        autoClose: 6000,
        title: 'Error!!!',
        message: error,
        color: 'red',
        icon: <IconX />,
        loading: false,
      });
    }
  }, [isDeleteBulkCoursesSuccess, isDeleteBulkCoursesError]);

  const deleteBulkCoursesWrapper = () => {
    if (!isPasswordConfirm) {
      openConfirmPasswordModal();
    } else {
      openBulkDeleteModal();
    }
  };

  const confirmBulkDelete = () => {
    deleteBulkCourses({ course_ids: selectedCourses.map((selectedCourse) => selectedCourse.id) });
  };

  // bulk courses action
  const [
    coursesBulkAction,
    {
      isSuccess: isCoursesBulkActionSuccess,
      isLoading: isCoursesBulkActionLoading,
      isError: isCoursesBulkActionError,
      error: coursesBulkActionError,
    },
  ] = useCoursesBulkActionMutation();

  useEffect(() => {
    if (isCoursesBulkActionSuccess) {
      // setselectedCourses(null);
      updateLoadingNotificationSuccess({
        id: 'bulkCoursesAction',
        message: 'Bulk action for courses completed',
        time: 6000,
      });
    }

    if (isCoursesBulkActionError) {
      const error = _.isObject(coursesBulkActionError.errors)
        ? 'data is invalid.'
        : coursesBulkActionError.errors;

      updateLoadingNotificationError({
        id: 'bulkCoursesAction',
        title: 'Error!!!',
        message: error,
        time: 6000,
      });
    }
  }, [isCoursesBulkActionSuccess, isCoursesBulkActionError]);

  const submitBulkCoursesAction = (type) => {
    coursesBulkAction({
      type,
      course_ids: selectedCourses.map((selectedCourse) => selectedCourse.id),
    });
    showLoadingNotification({
      id: 'bulkCoursesAction',
      title: 'Processing...',
      message: 'processing bulk action for courses',
    });
  };

  //////////////

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

              {hasPermission('edit course', 'admin') && (
                <Menu.Item
                  icon={<FaEdit size={14} style={{ opacity: 0.6 }} />}
                  component={Link}
                  to={`/dashboard/instructor/courses/${row.id}/update`}
                >
                  Edit
                </Menu.Item>
              )}
              {hasPermission('delete course', 'admin') && (
                <Menu.Item
                  color="red"
                  icon={<FiTrash2 size={14} />}
                  onClick={() => {
                    setRequestCourseId(row.id);
                    deleteActionWrapper();
                  }}
                >
                  Delete
                </Menu.Item>
              )}
              <Menu.Divider />
              {hasPermission('publish course', 'admin') &&
                row.live_status != CourseInstructorLiveStatus.PUBLISH && (
                  <Menu.Item
                    icon={<ImEye size={14} style={{ opacity: 0.6 }} />}
                    onClick={() => {
                      setRequestCourseId(row.id);
                      courseAction({ course_id: row.id, type: 'publish' });
                    }}
                  >
                    Publish
                  </Menu.Item>
                )}

              {hasPermission('private course', 'admin') &&
                row.live_status != CourseInstructorLiveStatus.PRIVATE && (
                  <Menu.Item
                    icon={<ImEyeBlocked size={14} style={{ opacity: 0.6 }} />}
                    onClick={() => {
                      setRequestCourseId(row.id);
                      courseAction({ course_id: row.id, type: 'private' });
                    }}
                  >
                    Private
                  </Menu.Item>
                )}
              {hasPermission('draft course', 'admin') &&
                row.live_status != CourseInstructorLiveStatus.DRAFT && (
                  <Menu.Item
                    icon={<RiDraftLine size={14} style={{ opacity: 0.6 }} />}
                    onClick={() => {
                      setRequestCourseId(row.id);
                      courseAction({ course_id: row.id, type: 'draft' });
                    }}
                  >
                    Draft
                  </Menu.Item>
                )}
              <Menu.Divider />
              {hasPermission('approve course', 'admin') &&
                row.status != CourseInstructorStatus.APPROVE && (
                  <Menu.Item
                    color="teal"
                    icon={<IconCheck size={14} />}
                    onClick={() => {
                      setRequestCourseId(row.id);
                      courseAction({ course_id: row.id, type: 'approve' });
                    }}
                  >
                    Approve
                  </Menu.Item>
                )}
              {hasPermission('reject course', 'admin') &&
                row.status != CourseInstructorStatus.REJECT && (
                  <Menu.Item
                    color="red"
                    icon={<IconX size={14} />}
                    onClick={() => {
                      setRequestCourseId(row.id);
                      courseAction({ course_id: row.id, type: 'reject' });
                    }}
                  >
                    Reject
                  </Menu.Item>
                )}
              {hasPermission('block course', 'admin') &&
                row.status != CourseInstructorStatus.BLOCKED && (
                  <Menu.Item
                    color="red"
                    icon={<IconX size={14} />}
                    onClick={() => {
                      setRequestCourseId(row.id);
                      courseAction({ course_id: row.id, type: 'blocked' });
                    }}
                  >
                    Block
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
          src={
            row.thumbnail
              ? getImageUrl(row.thumbnail)
              : getDimensionImageUrl({ dimension: '640X360' })
          }
          width="100%"
          p={8}
          radius="md"
        />
      ),
      maxWidth: '180px',
      minWidth: '180px',
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
      selector: (row) => row.comments,
      // sortable: true,
      maxWidth: '90px',
      minWidth: '90px',
      compact: true,
    },
    {
      name: 'Created',
      selector: (row) =>
        formatDistance(new Date(row.created_at), new Date(), {
          addSuffix: true,
        }),
      // sortable: true,
      maxWidth: '140px',
      minWidth: '140px',
      compact: true,
    },
    {
      name: 'Updated',
      selector: (row) =>
        formatDistance(new Date(row.updated_at), new Date(), {
          addSuffix: true,
        }),
      // sortable: true,
      maxWidth: '140px',
      minWidth: '140px',
      compact: true,
    },
    {
      name: 'Content Updated',
      selector: (row) =>
        row.content_updated_at
          ? formatDistance(new Date(row.content_updated_at), new Date(), {
              addSuffix: true,
            })
          : 'N/A',
      // sortable: true,
      maxWidth: '140px',
      minWidth: '140px',
      compact: true,
    },
    {
      name: 'Published',
      selector: (row) =>
        row.published_at
          ? formatDistance(new Date(row.published_at), new Date(), {
              addSuffix: true,
            })
          : 'unpublish',
      // sortable: true,
      maxWidth: '140px',
      minWidth: '140px',
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
  ]);

  const generateUrlQuery = useCallback(() => {
    const query = new Query();
    let urlQuery = query.for('admin/courses'); // the model you're selecting
    // .where('title', 'me')

    if (courseTitle) {
      urlQuery = urlQuery.where('title', courseTitle); // where the models `name` is 'Bob'
    }
    if (instructorId) {
      urlQuery = urlQuery.where('instructorId', instructorId);
    }
    if (coursePrice) {
      urlQuery = urlQuery.where('price', coursePrice);
    }
    if (courseStatus) {
      urlQuery = urlQuery.where('status', courseStatus);
    }
    if (courseLiveStatus) {
      urlQuery = urlQuery.where('live_status', courseLiveStatus);
    }
    if (courseDiscount) {
      urlQuery = urlQuery.where('discount', courseDiscount);
    }
    if (courseStars) {
      urlQuery = urlQuery.where('stars', courseStars);
    }
    if (courseComments) {
      urlQuery = urlQuery.where('comments', courseComments);
    }
    if (courseAccessDays) {
      urlQuery = urlQuery.where('access_days', courseAccessDays);
    }
    if (coursePublished) {
      urlQuery = urlQuery.where('published', coursePublished);
    }
    if (courseContentUpdated) {
      urlQuery = urlQuery.where('content_updated', courseContentUpdated);
    }
    if (courseCreated) {
      urlQuery = urlQuery.where('created', courseCreated);
    }
    if (courseUpdated) {
      urlQuery = urlQuery.where('updated', courseUpdated);
    }
    if (courseSortField) {
      let symbol = courseSortSymbol == '-' ? '-' : '';

      urlQuery = urlQuery.sort(`${symbol}${courseSortField}`);
    } else {
      urlQuery = urlQuery.sort('-created_at');
    }

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
        'fields[courses]': `id,title,price,discount,access_days,status,live_status,stars,comments,published_at,content_updated_at,created_at,updated_at,thumbnail_id`,
      });

    urlQuery = urlQuery.get();

    console.log('Query urlQuery::::: ', urlQuery);
    // alert('app loaded');

    return urlQuery;
  }, [currentPage, rowsPerPage, submitFilter]);

  const {
    isSuccess: isGetCoursesSuccess,
    isFetching: isGetCoursesFetching,
    isError: isGetCoursesError,
    data: coursesWithDetailData,
  } = useGetCoursesQuery({ url: generateUrlQuery(), submitFilter }); //force to refetch

  const handlePageChange = (page) => {
    // console.log('handlePageChange', page);
    setCurrentPage(page);
  };

  const handlePerRowsChange = (rows, page) => {
    // console.log('handlePerRowsChange', rows, page);
    setRowsPerPage(rows);
    setCurrentPage(1);
  };

  const submitFilterWrapper = () => {
    setSubmitFilter(randomNumber());
    closeRightFilter();
    setCurrentPage(1);
    setselectedCourses(null);
  };

  const submitSearch = () => {
    setSubmitFilter(randomNumber());
    setCurrentPage(1);
    setSearchPopoverOpened(false);
    setselectedCourses(null);
  };

  const clear = () => {
    setCourseTitle('');
    setInstructorId(null);
    setCoursePrice(null);
    setCourseDiscount(null);
    setCourseStatus(null);
    setCourseLiveStatus(null);
    setCourseStars(null);
    setCourseComments(null);
    setCourseAccessDays(null);
    setCoursePublished(null);
    setCourseContentUpdated(null);
    setCourseCreated(null);
    setCourseUpdated(null);
    setCourseSortField(null);
    setselectedCourses(null);
  };

  const submitViaCourseCard = (type = 'total') => {
    clear();
    if (type == 'total') {
      // pass
    } else if (type == 'publish' || type == 'private' || type == 'draft') {
      setCourseLiveStatus(type);
    } else if (type == 'pending' || type == 'approved' || type == 'reject' || type == 'blocked') {
      setCourseStatus(type);
    } else {
      throw new Error('[pkfan error] course card (type) not correct.');
    }
    submitFilterWrapper();
  };

  return (
    <>
      <Stack sx={{ width: '100%' }}>
        {/* <MainLoadingOverlay visibleOvarlay={visibleOvarlay} /> */}

        <PageTitle title="Course Management">
          <Group>
            <Button compact component={Link} to="#" leftIcon={<SiAddthis size={16} />}>
              Add New
            </Button>
          </Group>
        </PageTitle>

        <AdminCourseDetailCards submitViaCourseCard={submitViaCourseCard} />

        <Paper
          sx={{ position: 'relative', zIndex: 0, paddingTop: '48px!important', minHeight: 400 }}
        >
          {/* action dropdown  */}
          {selectedCourses?.length > 0 && (
            <Flex
              align="center"
              gap={8}
              sx={{
                position: 'absolute',
                left: 16,
                top: 8,
              }}
            >
              <Box>
                <Menu shadow="md">
                  <Menu.Target>
                    <MantineButton
                      compact
                      sx={(theme) => ({
                        backgroundImage: `linear-gradient(${theme.colors.lmsLayout[0]}, ${theme.colors.lmsLayout[3]})`,

                        textTransform: 'uppercase',

                        '&:hover': {
                          backgroundImage: `linear-gradient(${theme.colors.lmsLayout[3]}, ${theme.colors.lmsLayout[0]})`,
                        },
                      })}
                      variant="outline"
                      component="div"
                      color="lmsLayout"
                      rightIcon={<FaChevronDown size={14} />}
                    >
                      Bulk Actions
                    </MantineButton>
                  </Menu.Target>

                  <Menu.Dropdown>
                    {hasPermission('publish course', 'admin') && (
                      <Menu.Item
                        icon={<ImEye size={14} style={{ opacity: 0.6 }} />}
                        onClick={() => submitBulkCoursesAction('publish')}
                      >
                        Publish All
                      </Menu.Item>
                    )}

                    {hasPermission('private course', 'admin') && (
                      <Menu.Item
                        icon={<ImEyeBlocked size={14} style={{ opacity: 0.6 }} />}
                        onClick={() => submitBulkCoursesAction('private')}
                      >
                        Private All
                      </Menu.Item>
                    )}

                    {hasPermission('draft course', 'admin') && (
                      <Menu.Item
                        icon={<RiDraftLine size={14} style={{ opacity: 0.6 }} />}
                        onClick={() => submitBulkCoursesAction('draft')}
                      >
                        Draft All
                      </Menu.Item>
                    )}

                    <Menu.Divider />
                    {hasPermission('approve course', 'admin') && (
                      <Menu.Item
                        color="teal"
                        icon={<IconCheck size={14} />}
                        onClick={() => submitBulkCoursesAction('approve')}
                      >
                        Approve All
                      </Menu.Item>
                    )}
                    {hasPermission('reject course', 'admin') && (
                      <Menu.Item
                        color="red"
                        icon={<IconX size={14} />}
                        onClick={() => submitBulkCoursesAction('reject')}
                      >
                        Reject All
                      </Menu.Item>
                    )}
                    {hasPermission('block course', 'admin') && (
                      <Menu.Item
                        color="red"
                        icon={<IconX size={14} />}
                        onClick={() => submitBulkCoursesAction('blocked')}
                      >
                        Block All
                      </Menu.Item>
                    )}
                    <Menu.Divider />
                    {hasPermission('delete course', 'admin') && (
                      <Menu.Item
                        color="red"
                        icon={<FiTrash2 size={14} />}
                        onClick={deleteBulkCoursesWrapper}
                      >
                        Delete All
                      </Menu.Item>
                    )}
                  </Menu.Dropdown>
                </Menu>
              </Box>

              <Title order={5}>Total {selectedCourses.length} courses selected.</Title>
            </Flex>
          )}
          <Box
            sx={{
              position: 'absolute',
              right: 16,
              top: 8,
              width: 300,
              display: 'flex',
              justifyContent: 'end',
            }}
          >
            {/* search  */}
            <Popover
              opened={searchPopoverOpened}
              onChange={setSearchPopoverOpened}
              width={300}
              trapFocus
              position="bottom-end"
              withArrow
              shadow="md"
            >
              <Popover.Target>
                <MantineButton
                  onClick={() => {
                    setSearchPopoverOpened(true);
                    clear();
                  }}
                  compact
                  sx={(theme) => ({
                    height: 40,
                    paddingLeft: 8,
                    paddingRight: 8,
                    borderLeft: `1px solid ${theme.colors.lmsLayout[3]}`,
                  })}
                  leftIcon={<ImSearch size={16} />}
                  color="lmsLayout"
                  variant="transparent"
                >
                  Search
                </MantineButton>
              </Popover.Target>
              <Popover.Dropdown
                sx={(theme) => ({
                  background: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
                })}
              >
                <Stack>
                  <TextInput
                    onChange={(event) => setCourseTitle(event.target.value)}
                    placeholder="search courses"
                  />
                  <Button onClick={submitSearch} variant="lmsSecondary" sx={{ width: '100%' }}>
                    Search
                  </Button>
                </Stack>
              </Popover.Dropdown>
            </Popover>
            {/* filter  */}
            <MantineButton
              compact
              leftIcon={<ImFilter size={20} />}
              sx={(theme) => ({
                height: 40,
                paddingLeft: 8,
                paddingRight: 8,
                borderLeft: `1px solid ${theme.colors.lmsLayout[3]}`,
              })}
              color="lmsLayout"
              variant="transparent"
              onClick={openRightFilter}
            >
              Filter
            </MantineButton>
          </Box>
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
            selectableRows
            selectableRowsHighlight
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
            onSelectedRowsChange={({ selectedRows }) => setselectedCourses(selectedRows)}
          />
          {/* )} */}
        </Paper>
      </Stack>
      {/* filter right sidebar  */}
      <RightDrawer title="" size="lg" opened={openedRightFilter} onClose={closeRightFilter}>
        <AdminCourseFilter
          instructorId={instructorId}
          setInstructorId={setInstructorId}
          courseTitle={courseTitle}
          setCourseTitle={setCourseTitle}
          coursePrice={coursePrice}
          setCoursePrice={setCoursePrice}
          courseStatus={courseStatus}
          setCourseStatus={setCourseStatus}
          courseLiveStatus={courseLiveStatus}
          setCourseLiveStatus={setCourseLiveStatus}
          courseDiscount={courseDiscount}
          setCourseDiscount={setCourseDiscount}
          courseStars={courseStars}
          setCourseStars={setCourseStars}
          courseComments={courseComments}
          setCourseComments={setCourseComments}
          courseAccessDays={courseAccessDays}
          setCourseAccessDays={setCourseAccessDays}
          coursePublished={coursePublished}
          setCoursePublished={setCoursePublished}
          courseContentUpdated={courseContentUpdated}
          setCourseContentUpdated={setCourseContentUpdated}
          courseCreated={courseCreated}
          setCourseCreated={setCourseCreated}
          courseUpdated={courseUpdated}
          setCourseUpdated={setCourseUpdated}
          courseSortField={courseSortField}
          setCourseSortField={setCourseSortField}
          courseSortSymbol={courseSortSymbol}
          setCourseSortSymbol={setCourseSortSymbol}
          submitFilterWrapper={submitFilterWrapper}
          clear={clear}
        />
      </RightDrawer>
      <ConfirmPasswordModal opened={openedConfirmPasswordModal} close={closeConfirmPasswordModal} />
      <DeleteModal
        title="Delete Course"
        opened={openedDeleteModal}
        confirm={confirmDelete}
        close={closeDeleteModal}
        isDeleting={isDeleteCourseLoading}
      >
        <Text>Are you sure to delete course?</Text>
        <br />
        <Text>
          If you delete this course, then all lessons and files of this course will be deleted.
        </Text>
        <br />
      </DeleteModal>
      <DeleteModal
        title="Delete All Courses"
        opened={openedBulkDeleteModal}
        confirm={confirmBulkDelete}
        close={closeBulkDeleteModal}
        isDeleting={isDeleteBulkCoursesLoading}
      >
        <Text>Are you sure to delete All courses?</Text>
        <br />
        <Text>
          If you delete all these course, then all lessons and files of these course will be
          deleted.
        </Text>
        <br />
      </DeleteModal>
    </>
  );
}

export default AdminCourseList;
