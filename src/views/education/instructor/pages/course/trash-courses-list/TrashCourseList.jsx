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

import {
  useGetCoursesQuery,
  useDeleteCoursePermanentMutation,
  useDeleteBulkCoursesPermanentMutation,
  useRestoreTrashCourseMutation,
  useRestoreBulkTrashCoursesMutation,
} from '@/views/education/instructor/api';

import TrashCourseFilter from './TrashCourseFilter';
import TrashCourseDetailCards from './TrashCourseDetailCards';

import { useSelector } from 'react-redux';

import {
  SiAddthis,
  ImFilter,
  ImSearch,
  ImEye,
  IconDotsVertical,
  IconCheck,
  IconX,
  FaEdit,
  FaChevronDown,
  FiTrash2,
} from '@/components/icons';
import { usePermissions } from '@/hooks';

export function TrashCourseList() {
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

  const [
    openedConfirmPasswordModal,
    { open: openConfirmPasswordModal, close: closeConfirmPasswordModal },
  ] = useDisclosure(false);

  // delete course
  const [
    deleteCoursePermanent,
    {
      isSuccess: isDeleteCoursePermanentSuccess,
      isLoading: isDeleteCoursePermanentLoading,
      isError: isDeleteCoursePermanentError,
      error: deleteCoursePermanentError,
      // data: deleteCoursePermanentData,
    },
  ] = useDeleteCoursePermanentMutation();

  useEffect(() => {
    if (isDeleteCoursePermanentSuccess) {
      closeDeleteModal();
      setselectedCourses(null);
      showNotification({
        id: 'deleteCoursePermanentSuccess',
        autoClose: 6000,
        title: 'Success',
        message: 'Course has been permanent deleted.',
        color: 'teal',
        icon: <IconCheck />,
        loading: false,
      });
    }

    if (isDeleteCoursePermanentError) {
      closeDeleteModal();
      const error = _.isObject(deleteCoursePermanentError.errors)
        ? 'data is invalid.'
        : deleteCoursePermanentError.errors;
      showNotification({
        id: 'deleteCoursePermanentError',
        autoClose: 6000,
        title: 'Error!!!',
        message: error,
        color: 'red',
        icon: <IconX />,
        loading: false,
      });
    }
  }, [isDeleteCoursePermanentSuccess, isDeleteCoursePermanentError]);

  const deleteActionWrapper = () => {
    if (!isPasswordConfirm) {
      openConfirmPasswordModal();
    } else {
      openDeleteModal();
    }
  };

  const confirmDelete = () => {
    deleteCoursePermanent({ course_id: requestCourseId });
  };

  // course action
  const [
    restoreTrashCourse,
    {
      isSuccess: isRestoreTrashCourseSuccess,
      isLoading: isRestoreTrashCourseLoading,
      isError: isRestoreTrashCourseError,
      error: restoreTrashCourseError,
    },
  ] = useRestoreTrashCourseMutation();

  useEffect(() => {
    if (isRestoreTrashCourseSuccess) {
      showNotification({
        id: 'isRestoreTrashCourseSuccess',
        autoClose: 6000,
        title: 'Success',
        message: 'Course restored.',
        color: 'teal',
        icon: <IconCheck />,
        loading: false,
      });
    }

    if (isRestoreTrashCourseError) {
      const error = _.isObject(restoreTrashCourseError.errors)
        ? 'data is invalid.'
        : restoreTrashCourseError.errors;
      showNotification({
        id: 'isRestoreTrashCourseError',
        autoClose: 6000,
        title: 'Error!!!',
        message: error,
        color: 'red',
        icon: <IconX />,
        loading: false,
      });
    }
  }, [isRestoreTrashCourseSuccess, isRestoreTrashCourseError]);

  //bulk course delete
  const [
    deleteBulkCoursesPermanent,
    {
      isSuccess: isDeleteBulkCoursesPermanentSuccess,
      isLoading: isDeleteBulkCoursesPermanentLoading,
      isError: isDeleteBulkCoursesPermanentError,
      error: deleteBulkCoursesPermanentError,
      // data: DeleteBulkCoursesPermanentData,
    },
  ] = useDeleteBulkCoursesPermanentMutation();

  useEffect(() => {
    if (isDeleteBulkCoursesPermanentSuccess) {
      closeBulkDeleteModal();
      setselectedCourses(null);
      showNotification({
        id: 'deleteBulkCoursesPermanentSuccess',
        autoClose: 6000,
        title: 'Success',
        message: 'Bulk Courses have been permanent deleted.',
        color: 'teal',
        icon: <IconCheck />,
        loading: false,
      });
    }

    if (isDeleteBulkCoursesPermanentError) {
      closeBulkDeleteModal();
      const error = _.isObject(deleteBulkCoursesPermanentError.errors)
        ? 'data is invalid.'
        : deleteBulkCoursesPermanentError.errors;
      showNotification({
        id: 'deleteBulkCoursesPermanentError',
        autoClose: 6000,
        title: 'Error!!!',
        message: error,
        color: 'red',
        icon: <IconX />,
        loading: false,
      });
    }
  }, [isDeleteBulkCoursesPermanentSuccess, isDeleteBulkCoursesPermanentError]);

  const deleteBulkWrapper = () => {
    if (!isPasswordConfirm) {
      openConfirmPasswordModal();
    } else {
      openBulkDeleteModal();
    }
  };

  const confirmBulkDelete = () => {
    deleteBulkCoursesPermanent({
      course_ids: selectedCourses.map((selectedCourse) => selectedCourse.id),
    });
  };

  // bulk courses action
  const [
    restoreBulkTrashCourses,
    {
      isSuccess: isRestoreBulkTrashCoursesSuccess,
      isLoading: isRestoreBulkTrashCoursesLoading,
      isError: isRestoreBulkTrashCoursesError,
      error: restoreBulkTrashCoursesError,
    },
  ] = useRestoreBulkTrashCoursesMutation();

  useEffect(() => {
    if (isRestoreBulkTrashCoursesSuccess) {
      setselectedCourses(null);
      updateLoadingNotificationSuccess({
        id: 'bulkAction',
        message: 'Bulk courses restored',
        time: 6000,
      });
    }

    if (isRestoreBulkTrashCoursesError) {
      const error = _.isObject(restoreBulkTrashCoursesError.errors)
        ? 'data is invalid.'
        : restoreBulkTrashCoursesError.errors;

      updateLoadingNotificationError({
        id: 'bulkAction',
        title: 'Error!!!',
        message: error,
        time: 6000,
      });
    }
  }, [isRestoreBulkTrashCoursesSuccess, isRestoreBulkTrashCoursesError]);

  const submitBulkAction = () => {
    restoreBulkTrashCourses({
      course_ids: selectedCourses.map((selectedCourse) => selectedCourse.id),
    });
    showLoadingNotification({
      id: 'bulkAction',
      title: 'Processing...',
      message: 'restoring bulk courses',
    });
  };

  //////////////

  const columns = useMemo(() => [
    {
      name: 'Action',
      selector: (row) => (
        <Box>
          <Menu shadow="md" position="left" offset={-5} withArrow arrowPosition="center">
            <Menu.Target>
              <ActionIcon
                loading={row.id == requestCourseId && isRestoreTrashCourseLoading}
                sx={(theme) => ({ '&:hover': { backgroundColor: theme.colors.lmsLayout[1] } })}
              >
                <IconDotsVertical size={20} />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              {hasPermission('restore deleted course', 'instructor') && (
                <Menu.Item
                  color="teal"
                  icon={<IconCheck size={14} />}
                  onClick={() => {
                    setRequestCourseId(row.id);
                    restoreTrashCourse({ course_id: row.id });
                  }}
                >
                  Restore
                </Menu.Item>
              )}
              <Menu.Divider />
              {hasPermission('permanent delete course', 'instructor') && (
                <Menu.Item
                  color="red"
                  icon={<FiTrash2 size={14} />}
                  onClick={() => {
                    setRequestCourseId(row.id);
                    deleteActionWrapper();
                  }}
                >
                  Delete Permanent
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
      name: 'Deleted',
      selector: (row) =>
        row.deleted_at
          ? formatDistance(new Date(row.deleted_at), new Date(), {
              addSuffix: true,
            })
          : 'N/A',
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
    let urlQuery = query
      .for('instructor/courses') // the model you're selecting
      .where('trash', 'only');

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
      urlQuery = urlQuery.sort('-deleted_at');
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
        'fields[courses]': `id,title,price,discount,access_days,status,live_status,stars,comments,deleted_at,content_updated_at,created_at,updated_at,thumbnail_id`,
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
  };

  const submitSearch = () => {
    setSubmitFilter(randomNumber());
    setCurrentPage(1);
    setSearchPopoverOpened(false);
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
  };

  const submitViaCourseCard = (type = 'total') => {
    clear();
    submitFilterWrapper();
  };

  return (
    <>
      <Stack sx={{ width: '100%' }}>
        {/* <MainLoadingOverlay visibleOvarlay={visibleOvarlay} /> */}

        <PageTitle title="Trash Courses">
          <Group>
            <Button compact component={Link} to="#" leftIcon={<SiAddthis size={16} />}>
              Add New
            </Button>
          </Group>
        </PageTitle>

        <TrashCourseDetailCards submitViaCourseCard={submitViaCourseCard} />

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
                    {hasPermission('restore deleted course', 'instructor') && (
                      <Menu.Item
                        color="teal"
                        icon={<IconCheck size={14} />}
                        onClick={() => {
                          submitBulkAction();
                        }}
                      >
                        Restore All
                      </Menu.Item>
                    )}
                    <Menu.Divider />
                    {hasPermission('permanent delete course', 'instructor') && (
                      <Menu.Item
                        color="red"
                        icon={<FiTrash2 size={14} />}
                        onClick={() => {
                          deleteBulkWrapper();
                        }}
                      >
                        Delete All Permanent
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
        <TrashCourseFilter
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
        title="Delete Course permanently"
        opened={openedDeleteModal}
        confirm={confirmDelete}
        close={closeDeleteModal}
        isDeleting={isDeleteCoursePermanentLoading}
      >
        <Text>Are you sure to delete this course permanent?</Text>
        <br />
        <Text>
          If you delete this course permanent, then all lessons and files of this course will be
          deleted permanantly from server.
        </Text>
        <br />
      </DeleteModal>
      <DeleteModal
        title="Delete All Courses permanently"
        opened={openedBulkDeleteModal}
        confirm={confirmBulkDelete}
        close={closeBulkDeleteModal}
        isDeleting={isDeleteBulkCoursesPermanentLoading}
      >
        <Text>Are you sure to delete All courses permanently?</Text>
        <br />
        <Text>
          If you delete all these course permanently, then all lessons and files of these course
          will be deleted permanantly from server.
        </Text>
        <br />
      </DeleteModal>
    </>
  );
}

export default TrashCourseList;
