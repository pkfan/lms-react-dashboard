import _ from 'lodash';
import { useState, useEffect } from 'react';
import {
  Grid,
  Image,
  Box,
  Title,
  Text,
  Flex,
  Menu,
  Stack,
  Button as MantineButton,
} from '@mantine/core';
import CourseCardAction from './CourseCardAction';
import { FaEdit, FaChevronDown } from 'react-icons/fa';
import { ImEye, ImEyeBlocked } from 'react-icons/im';
import { MdOutlineQuiz, MdOutlineAssignment, MdDeleteForever } from 'react-icons/md';
import { useGetImageQuery } from '@/api/base';
import getImageUrl from '@/helpers/getImageUrl';
import getDimensionImageUrl from '@/helpers/image/getDimensionImageUrl';
import liveStatusEnum from '@/enums/course/liveStatusEnum';
import statusEnum from '@/enums/course/statusEnum';
import { Link } from 'react-router-dom';
import { useDisclosure } from '@mantine/hooks';
import ConfirmPasswordModal from '../../../components/ConfirmPasswordModal';
import DeleteModal from '@/components/common/modals/DeleteModal';
import { useDeleteCourseMutation } from '@/views/education/instructor/api';
import { showNotification } from '@mantine/notifications';
import { IconX } from '@tabler/icons';
import calculateCourseDiscount from '@/helpers/course/calculateCourseDiscount';
import StarsRating from '@/components/StarsRating';
import { formatDistance } from 'date-fns';
import statusAndColor from '@/helpers/course/statusAndColor';
import liveStatusAndColor from '@/helpers/course/liveStatusAndColor';

export function CourseCard({ course }) {
  const [openedDeleteModal, { open: openDeleteModal, close: closeDeleteModal }] =
    useDisclosure(false);
  // confirm password
  const [isConfirmPassword, setIsConfirmPassword] = useState(false);
  const [
    openedConfirmPasswordModal,
    { open: openConfirmPasswordModal, close: closeConfirmPasswordModal },
  ] = useDisclosure(false);

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

  const statusColor = {
    pending: 'orange',
    approved: 'teal',
    reject: 'pink',
    blocked: 'red',
  };

  const liveStatusColor = {
    publish: 'green',
    private: 'lmsLayout',
    draft: 'yellow',
  };

  let status = statusEnum(course.status);
  let staCol = statusColor[status];
  let liveStatus = liveStatusEnum(course.live_status);
  let liveStaCol = liveStatusColor[liveStatus];
  // console.log('liveStatus === ', liveStatus);
  // console.log('liveStaCol === ', liveStaCol);

  useEffect(() => {
    if (isDeleteCourseSuccess) {
      closeDeleteModal();
    }

    if (isDeleteCourseError) {
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
    if (!isConfirmPassword) {
      openConfirmPasswordModal();
    } else {
      openDeleteModal();
    }
  };

  const confirmDelete = () => {
    deleteCourse({ course_id: course.id });
  };

  return (
    <>
      <Grid
        sx={(theme) => ({
          border: `1px solid ${theme.colors.lmsLayout[3]}`,
          borderRadius: 16,
          position: 'relative',
        })}
      >
        {/* <Title
        order={3}
        sx={(theme) => ({
          position: 'absolute',
          top: '50%',
          left: -16,
          transform: 'translateY(-50%)',
          backgroundColor: theme.colors.lmsPrimary[2],
          border: `2px solid ${theme.colors.lmsSecondary[5]}`,
          borderRadius: '50%',
          padding: '4px 16px',
          zIndex: 1,
          textAlign: 'center',
        })}
      >
        1
      </Title> */}
        <Grid.Col span={12} xs={3}>
          <Flex justify="center" align="center" w="100%" h="100%">
            <Image
              radius="md"
              src={
                course?.thumbnail
                  ? getImageUrl(course?.thumbnail)
                  : getDimensionImageUrl({ dimension: '640X360' })
              }
              alt="thumbnail"
            />
          </Flex>
        </Grid.Col>
        <Grid.Col span={12} xs={7}>
          <Title order={5}> {course.title}</Title>
          <StarsRating stars={course.stars} />
          <Text>
            Chapters: {course.chapters_count} | Lessons: {course.lessons_count} | Duration:{' '}
            {course.videos_sum_duration}{' '}
          </Text>
          <Flex>
            <Text>
              Price: {course.price ? `$${course.price} ` : 'FREE '} | Discount:{' '}
              {course.discount ? `${course.discount}% ` : '0% '} | Discount Price:{' '}
              {calculateCourseDiscount(course)}
            </Text>
          </Flex>
          <Text>
            Authors:{' '}
            {course.not_rejected_instructors.map((instructor) => instructor.full_name).join(' | ')}
          </Text>
          <Flex>
            <Text>
              Live Status:{' '}
              <Box
                sx={(theme) => ({
                  backgroundColor: theme.colors[liveStatusAndColor(course).liveStatusColor][3],
                  padding: '2px 8px',
                  borderRadius: '100%',
                  maxWidth: 'max-content',
                  display: 'inline',
                  color: '#000',
                  fontWeight: 'bold',
                  fontSize: 12,
                })}
              >
                {liveStatusAndColor(course).liveStatus}
              </Box>
            </Text>
            <Text>
              {'  '}| status:{' '}
              <Box
                sx={(theme) => ({
                  backgroundColor: theme.colors[statusAndColor(course).statusColor][3],
                  padding: '2px 8px',
                  borderRadius: '100%',
                  maxWidth: 'max-content',
                  display: 'inline',
                  color: '#000',
                  fontWeight: 'bold',
                  fontSize: 12,
                })}
              >
                {statusAndColor(course).status}
              </Box>
            </Text>
          </Flex>
          <Text>
            Published:{' '}
            {formatDistance(new Date(course.created_at), new Date(), {
              addSuffix: true,
            })}{' '}
            | Updated:{' '}
            {formatDistance(new Date(course.updated_at), new Date(), {
              addSuffix: true,
            })}
          </Text>
        </Grid.Col>
        <Grid.Col
          span={12}
          xs={2}
          sx={(theme) => ({
            borderLeft: `1px solid ${theme.colors.lmsLayout[3]}`,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          })}
        >
          <Stack>
            <Flex align="center" justify="center" gap={8} wrap="wrap">
              <CourseCardAction tooltip="View Course Live">
                <ImEye size={24} />
              </CourseCardAction>
              <CourseCardAction
                component={Link}
                to={`/dashboard/instructor/course/${course.id}/update`}
                tooltip="Edit Course"
              >
                <FaEdit size={24} />
              </CourseCardAction>
              <CourseCardAction tooltip="Delete Course" onClick={deleteActionWrapper}>
                <MdDeleteForever size={24} />
              </CourseCardAction>
            </Flex>
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
                    More
                  </MantineButton>
                </Menu.Target>

                <Menu.Dropdown>
                  <Menu.Item icon={<MdOutlineQuiz size={14} />}>Quizes</Menu.Item>
                  <Menu.Item icon={<MdOutlineAssignment size={14} />}>Assignments</Menu.Item>
                  <Menu.Item icon={<ImEyeBlocked size={14} />}>Make Private</Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </Box>
          </Stack>
        </Grid.Col>
      </Grid>
      <ConfirmPasswordModal
        setIsConfirmPassword={setIsConfirmPassword}
        opened={openedConfirmPasswordModal}
        close={closeConfirmPasswordModal}
      />
      <DeleteModal
        title="Delete Course"
        opened={openedDeleteModal}
        confirm={confirmDelete}
        close={closeDeleteModal}
        isDeleting={isDeleteCourseLoading}
      >
        <Text>
          Are you sure to delete (<span style={{ color: 'red' }}>{course.title}</span>) course?
        </Text>
        <br />
        <Text>
          If you delete this course, then all lessons and files of this course will be deleted
          permanently.
        </Text>
        <br />
      </DeleteModal>
    </>
  );
}

export default CourseCard;
