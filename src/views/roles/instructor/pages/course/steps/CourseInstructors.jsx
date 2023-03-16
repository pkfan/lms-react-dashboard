import { useState, useEffect } from 'react';
import _ from 'lodash';
import {
  TextInput,
  Stack,
  Paper,
  NumberInput,
  Flex,
  Title,
  Divider,
  Radio,
  Textarea,
  Progress,
  Box,
  Text,
  Loader,
} from '@mantine/core';
import Button from '@/components/common/Button';
import MultiSelectUserWithImage from '@/components/MultiSelectUserWithImage';
import { AiOutlineUsergroupAdd } from 'react-icons/ai';
import { FaSave } from 'react-icons/fa';
import {
  useGetInstructorsQuery,
  useSetCourseInstructorsMutation,
} from '@/views/roles/instructor/api';
import { IconX, IconCheck } from '@tabler/icons';
import Overlay from '@/components/common/Overlay';
import courseInstructorRelation from '@/enums/courseInstructorRelation';
import { useSelector } from 'react-redux';
import { showNotification } from '@mantine/notifications';
import SwtichText from '@/components/common/SwitchText';

export function CourseInstructors({ course }) {
  // if (!course) {
  //   return (
  //     <Title order={4}>please save above course fields to load instructors for inviting.</Title>
  //   );
  // }

  const authUser = useSelector((state) => state.authSlice.auth.user);

  const isCourseOwner = () => {
    // if creating course then show course owner
    if (!course) return true;

    if (!authUser?.id) {
      throw new Error('Auth user not found [pkfan error]');
    }

    let isOwner = false;
    course?.instructors?.map((instructor) => {
      if (
        instructor.id == authUser?.id &&
        courseInstructorRelation(instructor.pivot.course_relation) == 'owner'
      ) {
        isOwner = true;
      }
    });

    return isOwner;
  };

  const initInstructors = course?.instructors?.map((instructor) => instructor.id) || [];
  const [selectedInstructorsIds, setSelectedInstructorsIds] = useState(initInstructors);
  const [editInstructors, setEditInstructors] = useState(false);

  console.log('======== selectedInstructorsIds', selectedInstructorsIds);
  console.log('======== authUser', authUser);

  const {
    isSuccess: isGetInstructorsSuccess,
    isFetching: isGetInstructorsFetching,
    isError: isGetInstructorsError,
    data: instructors,
  } = useGetInstructorsQuery();

  const [
    setCourseInstructors,
    {
      isLoading: isSetCourseInstructorsLoading,
      isSuccess: isSetCourseInstructorsSuccess,
      error: setCourseInstructorsError,
      data: setCourseInstructorsData,
      isError: isSetCourseInstructorsError,
    },
  ] = useSetCourseInstructorsMutation();

  useEffect(() => {
    if (isSetCourseInstructorsSuccess) {
      showNotification({
        id: 'SetCourseInstructors',
        autoClose: 3000,
        title: 'Course Instructors updated',
        message: `Course instructors has been updated.`,
        color: 'teal',
        icon: <IconCheck />,
        loading: false,
      });
    }
    if (isSetCourseInstructorsError) {
      const error = _.isObject(setCourseInstructorsError.errors)
        ? 'data is invalid.'
        : setCourseInstructorsError.errors;
      showNotification({
        id: 'setCourseInstructorsError',
        autoClose: 6000,
        title: 'Error!!!',
        message: error,
        color: 'red',
        icon: <IconX />,
        loading: false,
      });
    }
  }, [isSetCourseInstructorsSuccess, isSetCourseInstructorsError]);

  const onSubmitForm = () => {
    if (selectedInstructorsIds.length <= 0) {
      setCourseInstructors({ course_instructors: null, course_id: course.id });
    }

    console.log('selectedInstructorsIds : ', selectedInstructorsIds);
    // PENDING = 0;
    // INVITE = 1;

    const oldCourseInstructors = {};
    course?.instructors?.forEach((instructor) => {
      //   set old status data for updation
      oldCourseInstructors[instructor.id] = {
        status: instructor.pivot.status, // pending
        course_relation: instructor.pivot.course_relation, // invite
      };
    });

    const finalCourseInstructors = {};

    selectedInstructorsIds.forEach((instructorId) => {
      if (instructorId != authUser?.id) {
        if (oldCourseInstructors[instructorId]) {
          finalCourseInstructors[instructorId] = oldCourseInstructors[instructorId];
        } else {
          finalCourseInstructors[instructorId] = {
            status: 0, // pending
            course_relation: 1, // invite
          };
        }
      }
    });

    console.log('finalCourseInstructors : ', finalCourseInstructors);
    setCourseInstructors({ course_instructors: finalCourseInstructors, course_id: course.id });
  };

  return (
    <>
      {isCourseOwner() && (
        <Stack
          spacing="lg"
          py={16}
          sx={(theme) => ({
            border: `1px solid ${theme.colors.lmsLayout[4]}`,
            borderRadius: 4,
            margin: 8,
            position: 'relative',
          })}
        >
          {!course && <Overlay />}
          <Flex justify="center" align="center">
            <Title order={4}>Invite Other Instructors</Title>
          </Flex>
          <Stack w="100%" spacing="xs">
            {isGetInstructorsFetching && (
              <Flex align="center" justify="center">
                <Loader size="sm" />
              </Flex>
            )}
            {isGetInstructorsError && (
              <Flex
                align="center"
                justify="center"
                sx={(theme) => ({ color: theme.colors.red[5] })}
              >
                <IconX size={16} />
                <Text>Error to load Instructor List, Please refresh browser.</Text>
              </Flex>
            )}
            {isGetInstructorsSuccess && (
              <MultiSelectUserWithImage
                users={instructors}
                selectedUser={selectedInstructorsIds}
                setSelectedUser={setSelectedInstructorsIds}
                sx={(theme) => ({
                  margin: '0 16px',
                  '& input::placeholder': {
                    color: theme.colors.lmsLayout[4],
                  },
                  [`@media (min-width: ${theme.breakpoints.sm}px)`]: {
                    margin: '0 32px',
                  },
                })}
                icon={<AiOutlineUsergroupAdd size={36} />}
                label="Choose Instructors"
                placeholder="Choose other instructors to create this course"
                description="Choose Other Instructors to create this course and upload lessons as your course partner, profit will share equally."
                readOnly={!editInstructors}
                size="lg"
              />
            )}
            <Flex align="center" gap={24} sx={{ padding: '0 32px' }}>
              <Title order={5}> Do you want to edit instructors?</Title>
              <SwtichText
                onLabel="YES"
                offLabel="NO"
                checked={editInstructors}
                setChecked={setEditInstructors}
              />
            </Flex>
          </Stack>

          <Flex w="100%" align="center" justify="center" py={32}>
            <Button
              onClick={onSubmitForm}
              color="lmsLayout"
              leftIcon={<FaSave size={16} />}
              loading={isSetCourseInstructorsLoading}
            >
              save
            </Button>
          </Flex>
        </Stack>
      )}
    </>
  );
}

export default CourseInstructors;
