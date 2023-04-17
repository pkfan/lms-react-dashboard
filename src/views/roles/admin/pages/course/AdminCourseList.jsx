import { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Title,
  Stack,
  Tabs,
  Badge,
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
  Drawer,
} from '@mantine/core';
import { Link, useSearchParams, useLocation } from 'react-router-dom';
import Pagination from '@/components/common/Pagination';
import Button from '@/components/common/Button';

import Paper from '@/components/common/Paper';
import PageTitle from '@/components/common/PageTitle';
import queryString from 'query-string';
import ConfuseImage from '@/components/images/ConfuseImage';
import ReactDataTable from '@/components/react-data-table/ReactDataTable';
import { useGetCoursesQuery } from '../../api';
import getImageUrl from '@/helpers/getImageUrl';
import getDimensionImageUrl from '@/helpers/image/getDimensionImageUrl';
import liveStatusAndColor from '@/helpers/course/liveStatusAndColor';
import statusAndColor from '@/helpers/course/statusAndColor';
import { formatDistance } from 'date-fns';
import StarsRating from '@/components/StarsRating';
import { useDisclosure } from '@mantine/hooks';

import { SiAddthis } from 'react-icons/si';
import { MdVideoSettings } from 'react-icons/md';
import { RiDraftLine } from 'react-icons/ri';
import { FiRefreshCw } from 'react-icons/fi';
import { ImFilter, ImSearch } from 'react-icons/im';
import { IconDotsVertical, IconCheck, IconX } from '@tabler/icons';
import { Query } from '@/lib/cogent-js';
import AdminCourseFilter from './AdminCourseFilter';
import randomNumber from '@/helpers/randomNumber';

export function AdminCourseList() {
  const [courseTitle, setCourseTitle] = useState('');
  const [instructorId, setInstructorId] = useState(null);
  const [coursePrice, setCoursePrice] = useState(null);
  const [courseDiscount, setCourseDiscount] = useState(null);
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

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(50);

  const [openedRightFilter, { open: openRightFilter, close: closeRightFilter }] =
    useDisclosure(false);

  const [search, setSearch] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  let [searchParams, setSearchParams] = useSearchParams();

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
                  // setRequestCourseId(row.id);
                  // updateInviteCourse({ course_id: row.id, status: CourseInstructorStatus.APPROVE });
                }}
              >
                Accept
              </Menu.Item>
              <Menu.Item
                color="red"
                icon={<IconX size={14} />}
                onClick={() => {
                  // setRequestCourseId(row.id);
                  // updateInviteCourse({ course_id: row.id, status: CourseInstructorStatus.REJECT });
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

  const submitFilterWrapper = (randNum) => {
    setSubmitFilter(randNum);
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
    setCourseStars(null);
    setCourseComments(null);
    setCourseAccessDays(null);
    setCoursePublished(null);
    setCourseContentUpdated(null);
    setCourseCreated(null);
    setCourseUpdated(null);
    setCourseSortField(null);
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

        <Paper
          sx={{ position: 'relative', zIndex: 0, paddingTop: '40px!important', minHeight: 400 }}
        >
          {/* search   */}
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
                    setCourseTitle('');
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
      {/* filter right sidebar  */}
      <Drawer
        title=""
        size="lg"
        position="right"
        sx={{
          '& .mantine-Drawer-body': {
            margin: '24px 12px',
            overflowY: 'scroll',
            height: '95%',
          },
          '& .mantine-Drawer-closeButton': {
            position: 'absolute',
            left: 0,
            top: '-2px',
          },
        }}
        opened={openedRightFilter}
        onClose={closeRightFilter}
      >
        <AdminCourseFilter
          instructorId={instructorId}
          setInstructorId={setInstructorId}
          courseTitle={courseTitle}
          setCourseTitle={setCourseTitle}
          coursePrice={coursePrice}
          setCoursePrice={setCoursePrice}
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
      </Drawer>
    </>
  );
}

export default AdminCourseList;