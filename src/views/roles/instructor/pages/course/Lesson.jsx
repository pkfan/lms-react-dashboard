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
import { RiVideoUploadFill } from 'react-icons/ri';
import { RiSortAsc } from 'react-icons/ri';
import { MdOutlineVideoLibrary, MdMenuBook } from 'react-icons/md';
import { FaPhotoVideo } from 'react-icons/fa';
import { ImEye, ImFilter, ImSearch } from 'react-icons/im';
import Paper from '@/components/common/Paper';
import CourseList from '@/views/course/components/CourseList';
import CourseCard from '@/views/course/components/CourseCard';
import PageTitle from '@/components/common/PageTitle';
import NotFoundImage from '@/components/images/NotFoundImage';
import queryString from 'query-string';
import { useGetCoursesQuery, useGetChaptersQuery } from '../../api';
import { IconX } from '@tabler/icons';
import UploadLessons from './components/lesson/UploadLessons';
import { useDispatch } from 'react-redux';
import { clearUploadLessonsData as clearUploadLessonsDataAction } from '@/views/roles/instructor/slice/lessonsUploadSlice';
import AllLessons from './components/lesson/AllLessons';
import SortLessons from './components/lesson/SortLessons';

export function Lesson() {
  const lessonsUploadDispatch = useDispatch();
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

  const {
    isSuccess: isGetChaptersSuccess,
    isFetching: isGetChaptersFetching,
    isError: isGetChaptersError,
    data: chapters,
  } = useGetChaptersQuery(courseId);

  const [chapterId, setChapterId] = useState(null);

  useEffect(() => {
    console.log('chapterid and course id chage from aprent');
    lessonsUploadDispatch(clearUploadLessonsDataAction());

    setReInitResumeable(true);

    setTimeout(() => {
      setReInitResumeable(false);
    }, 1000);
  }, [chapterId, courseId]);

  const transformCourseData = () => {
    const data = courses.map((course) => ({ value: course.id, label: course.title }));

    // return [{ value: '1', label: 'there are no course' }];
    return data;
  };
  const transformChapterData = () => {
    const data = chapters.map((chapter) => ({
      value: chapter.id,
      label: `Chapter ${chapter.number}: ${chapter.name}`,
    }));

    // return [{ value: '1', label: 'there are no course' }];
    return data;
  };

  return (
    <Stack sx={{ width: '100%' }}>
      {/* <MainLoadingOverlay visibleOvarlay={visibleOvarlay} /> */}

      <PageTitle title="Lessons Management">
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
            placeholder="select course to upload lessons"
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
              You do not have any course, please create course in order to upload lessons.
            </Text>
          </Flex>
        )}

        {isGetChaptersError && (
          <Flex align="center" justify="center" sx={(theme) => ({ color: theme.colors.red[5] })}>
            <IconX size={16} />
            <Text>Error to load Chapters, Please refresh browser.</Text>
          </Flex>
        )}
        {isGetChaptersFetching ? (
          <Flex align="center" justify="center">
            <Loader size="sm" />
          </Flex>
        ) : (
          <>
            {isGetChaptersSuccess && chapters.length > 0 ? (
              <Select
                searchable
                nothingFound="No Found"
                dropdownPosition="bottom"
                maxDropdownHeight={400}
                withAsterisk
                sx={(theme) => ({
                  width: '100%',
                  '& input': {
                    backgroundColor: theme.colors.lmsSecondary[1],
                  },
                  '& input::placeholder': {
                    color: theme.colors.lmsLayout[4],
                  },
                })}
                label="Select Chapter"
                placeholder="select chapter to upload lessons"
                data={transformChapterData()}
                icon={<MdMenuBook size={16} />}
                value={chapterId}
                onChange={setChapterId}
                filter={(value, item) =>
                  item.label.toLowerCase().includes(value.toLowerCase().trim())
                }
              />
            ) : (
              <>
                {courseId && (
                  <Flex
                    align="center"
                    justify="center"
                    sx={(theme) => ({ color: theme.colors.red[5] })}
                  >
                    <IconX size={16} />
                    <Text>
                      Chapter NOT found from this course, first{' '}
                      <Anchor
                        component={Link}
                        to={`/dashboard/instructor/course/${courseId}/update`}
                      >
                        create chapter
                      </Anchor>{' '}
                      then upload lessons.
                    </Text>
                  </Flex>
                )}
              </>
            )}
          </>
        )}
      </Stack>

      {/* tabs  */}
      <Paper>
        <Tabs
          defaultValue="upload"
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
              icon={<FaPhotoVideo size={18} style={{ opacity: 0.7 }} />}
              value="all"
              color="lmsPrimary"
              sx={{ fontSize: '16px' }}
            >
              All Lessons
            </Tabs.Tab>
            <Tabs.Tab
              disabled={!(courseId && chapterId)}
              icon={<RiVideoUploadFill size={18} style={{ opacity: 0.6 }} />}
              value="upload"
              color="lmsPrimary"
              sx={{ fontSize: '16px' }}
            >
              Upload Lessons
            </Tabs.Tab>
            <Tabs.Tab
              icon={<RiSortAsc size={18} style={{ opacity: 0.7 }} />}
              sx={{ fontSize: '16px' }}
              value="sort"
              color="lmsSecondary"
            >
              Sort Lessons
            </Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="all">
            {chapterId && <AllLessons chapterId={chapterId} />}
            {!chapterId && (
              <NotFoundImage
                width={450}
                message="Please choose Course and chapter from above to load lessons."
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
                {courseId && chapterId && (
                  <UploadLessons
                    courseId={courseId}
                    chapterId={chapterId}
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
                {courseId && chapterId && (
                  <SortLessons
                    // courseId={courseId}
                    chapterId={chapterId}
                    // setReInitResumeable={setReInitResumeable}
                  />
                )}
              </>
            )}
            {!chapterId && (
              <NotFoundImage
                width={450}
                message="Please choose Course and chapter from above to sort lessons."
              />
            )}
          </Tabs.Panel>
        </Tabs>
      </Paper>
    </Stack>
  );
}

export default Lesson;
