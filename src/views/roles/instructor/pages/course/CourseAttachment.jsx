import { useState, useEffect } from 'react';
import {
  Title,
  Stack,
  Tabs,
  Badge,
  Box,
  Popover,
  Select,
  Group,
  Button as MantineButton,
  Loader,
  Flex,
  Text,
  Anchor,
} from '@mantine/core';
import { Link, useLocation } from 'react-router-dom';
import Pagination from '@/components/common/Pagination';
import Button from '@/components/common/Button';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { ImFolderUpload } from 'react-icons/im';
import { RiSortAsc } from 'react-icons/ri';
import { MdOutlineVideoLibrary, MdMenuBook } from 'react-icons/md';
import { RiFileEditFill } from 'react-icons/ri';
import { ImEye, ImFilter, ImSearch } from 'react-icons/im';
import Paper from '@/components/common/Paper';
import CourseList from '@/views/course/components/CourseList';
import CourseCard from '@/views/course/components/CourseCard';
import PageTitle from '@/components/common/PageTitle';
import NotFoundImage from '@/components/images/NotFoundImage';
import queryString from 'query-string';
import { useGetCoursesQuery } from '../../api';
import { IconX } from '@tabler/icons';
import UploadAttachments from './components/attachment/UploadAttachments';
import { useDispatch } from 'react-redux';
import { clearUploadData as clearUploadDataAction } from '@/views/roles/instructor/slice/filesUploadSlice';

import Attachments from './components/attachment/Attachments';
import SortAttachments from './components/attachment/SortAttachments';

export function CourseAttachment() {
  const filesUploadDispatch = useDispatch();
  const [reInitResumeable, setReInitResumeable] = useState(false);

  const [activeTab, setActiveTab] = useState('all');
  const {
    isSuccess: isGetCoursesSuccess,
    isFetching: isGetCoursesFetching,
    isError: isGetCoursesError,
    data: courses,
  } = useGetCoursesQuery();

  console.log('course data', courses);

  const [courseId, setCourseId] = useState(null);

  useEffect(() => {
    console.log('course id chage from aprent');
    filesUploadDispatch(clearUploadDataAction());

    setReInitResumeable(true);

    setTimeout(() => {
      setReInitResumeable(false);
    }, 1000);
  }, [courseId]);

  const transformCourseData = () => {
    const data = courses.map((course) => ({ value: course.id, label: course.title }));

    // return [{ value: '1', label: 'there are no course' }];
    return data;
  };

  return (
    <Stack sx={{ width: '100%' }}>
      {/* <MainLoadingOverlay visibleOvarlay={visibleOvarlay} /> */}

      <PageTitle title="Course Attachments">
        <Group>
          <Button
            compact
            color="lmsLayout"
            component={Link}
            to="create"
            leftIcon={<IoMdArrowRoundBack size={14} />}
          >
            Back to Course
          </Button>
        </Group>
      </PageTitle>
      <Stack w="70%" mx="auto">
        {isGetCoursesFetching && (
          <Flex align="center" justify="center">
            <Loader size="sm" />
          </Flex>
        )}
        {isGetCoursesError && (
          <Flex align="center" justify="center" sx={(theme) => ({ color: theme.colors.red[5] })}>
            <IconX size={16} />
            <Text>Error to load courses, Please refresh browser.</Text>
          </Flex>
        )}
        {isGetCoursesSuccess && (
          <Select
            disabled={courses.length <= 0}
            searchable
            nothingFound="No Found"
            dropdownPosition="bottom"
            maxDropdownHeight={400}
            withAsterisk
            sx={(theme) => ({
              width: '100%',
              '& input': {
                backgroundColor: theme.colors.lmsPrimary[1],
              },
              '& input::placeholder': {
                color: theme.colors.lmsLayout[4],
              },
            })}
            label="Select Course"
            placeholder="select course to upload attachments"
            data={transformCourseData()}
            icon={<MdOutlineVideoLibrary size={16} />}
            value={courseId}
            onChange={setCourseId}
            filter={(value, item) => item.label.toLowerCase().includes(value.toLowerCase().trim())}
          />
        )}
        {isGetCoursesSuccess && courses.length <= 0 && (
          <Flex align="center" justify="center" sx={(theme) => ({ color: theme.colors.red[5] })}>
            <IconX size={16} />
            <Text>
              You do not have any course, please create course in order to upload attachments.
            </Text>
          </Flex>
        )}
      </Stack>

      {/* tabs  */}
      <Paper>
        <Tabs
          defaultValue="all"
          value={activeTab}
          onTabChange={setActiveTab}
          sx={{
            position: 'relative',
            minHeight: 400,
            '& .mantine-Tabs-tabsList': {
              paddingRight: '35%',
            },
          }}
        >
          <Tabs.List>
            <Tabs.Tab
              icon={<RiFileEditFill size={18} style={{ opacity: 0.7 }} />}
              value="all"
              color="lmsPrimary"
              sx={{ fontSize: '16px' }}
            >
              All Attachments
            </Tabs.Tab>
            <Tabs.Tab
              disabled={!courseId}
              icon={<ImFolderUpload size={18} style={{ opacity: 0.6 }} />}
              value="upload"
              color="lmsPrimary"
              sx={{ fontSize: '16px' }}
            >
              Upload Files
            </Tabs.Tab>
            <Tabs.Tab
              icon={<RiSortAsc size={18} style={{ opacity: 0.7 }} />}
              sx={{ fontSize: '16px' }}
              value="sort"
              color="lmsSecondary"
            >
              Sort Files
            </Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="all">
            {courseId && <Attachments courseId={courseId} />}
            {!courseId && (
              <NotFoundImage
                width={450}
                message="Please choose Course from above to load attachments."
              />
            )}
          </Tabs.Panel>
          <Tabs.Panel value="upload">
            {reInitResumeable ? (
              <Flex align="center" justify="center" p={50}>
                <Loader size="md" />
              </Flex>
            ) : (
              <>
                {courseId && (
                  <UploadAttachments
                    courseId={courseId}
                    setReInitResumeable={setReInitResumeable}
                  />
                )}
              </>
            )}
          </Tabs.Panel>
          <Tabs.Panel value="sort">
            {reInitResumeable ? (
              <Flex align="center" justify="center" p={50}>
                <Loader size="md" />
              </Flex>
            ) : (
              <>
                {courseId && (
                  <SortAttachments
                    // courseId={courseId}
                    courseId={courseId}
                    // setReInitResumeable={setReInitResumeable}
                  />
                )}
              </>
            )}
            {!courseId && (
              <NotFoundImage width={450} message="Please choose Course from above to sort files." />
            )}
          </Tabs.Panel>
        </Tabs>
      </Paper>
    </Stack>
  );
}

export default CourseAttachment;
