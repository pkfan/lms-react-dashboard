import _ from 'lodash';
import { Grid, Stack, Box, Title, Text, Flex, Group } from '@mantine/core';
import { useState, useEffect } from 'react';
import { FaEdit } from 'react-icons/fa';
import { RiVideoUploadLine } from 'react-icons/ri';
import { MdMenuBook, MdOutlineAssignment, MdDeleteForever } from 'react-icons/md';
import ActionIconWithTooltip from '@/components/common/ActionIconWithTooltip';
import SwtichText from '@/components/common/SwitchText';
import { useDisclosure } from '@mantine/hooks';
import { useUpdateLessonMutation, useDeleteLessonMutation } from '@/views/roles/instructor/api';
import { showNotification } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons';
import DeleteModal from '@/components/common/modals/DeleteModal';
import ExtensionFileSvg from '@/components/ExtensionFileSvg';
import EditLessonModal from './EditLessonModal';
import { format, formatDistance, formatRelative, subDays } from 'date-fns';
import ConfirmPasswordModal from '@/components/ConfirmPasswordModal';

export function LessonsCard({ lesson, refetchLessons }) {
  const [openedEditLessonModal, { open: openEditLessonModal, close: closeEditLessonModal }] =
    useDisclosure(false);
  const [openedDeleteModal, { open: openDeleteModal, close: closeDeleteModal }] =
    useDisclosure(false);

  // confirm password
  const [isConfirmPassword, setIsConfirmPassword] = useState(false);
  const [
    openedConfirmPasswordModal,
    { open: openConfirmPasswordModal, close: closeConfirmPasswordModal },
  ] = useDisclosure(false);

  let uploadedDate = formatDistance(new Date(lesson.created_at), new Date(), {
    addSuffix: true,
  });
  let lessonUpdatedDate = formatDistance(new Date(lesson.updated_at), new Date(), {
    addSuffix: true,
  });

  // update lesson
  const [
    updateLesson,
    {
      isSuccess: isUpdateLessonSuccess,
      isLoading: isUpdateLessonLoading,
      isError: isUpdateLessonError,
      error: updateLessonError,
    },
  ] = useUpdateLessonMutation();

  useEffect(() => {
    if (isUpdateLessonSuccess) {
      showNotification({
        id: 'updateLessonSuccess',
        autoClose: 3000,
        title: `Lesson updated`,
        message: `Lesson has been updated.`,
        color: 'teal',
        icon: <IconCheck />,
        loading: false,
      });
      refetchLessons();
      closeEditLessonModal();
    }

    if (isUpdateLessonError) {
      const error = _.isObject(updateLessonError.errors)
        ? 'Input data is invalid.'
        : updateLessonError.errors;

      showNotification({
        id: 'updateLessonError',
        autoClose: 6000,
        title: 'Error!!!',
        message: error,
        color: 'red',
        icon: <IconX />,
        loading: false,
      });
    }
  }, [isUpdateLessonSuccess, isUpdateLessonError]);

  const onSubmitHandle = (values) => {
    values['lesson_id'] = lesson.id;
    console.log('lessons  values....', values);
    updateLesson(values);
  };

  // lesson delete
  const [
    deleteLesson,
    {
      isSuccess: isDeleteSuccess,
      isLoading: isDeleteLoading,
      isError: isDeleteError,
      error: deleteError,
    },
  ] = useDeleteLessonMutation();

  useEffect(() => {
    if (isDeleteSuccess) {
      showNotification({
        id: 'deleteDeleteSuccess',
        autoClose: 3000,
        title: `lesson deleted`,
        message: `lesson has been deleted.`,
        color: 'teal',
        icon: <IconCheck />,
        loading: false,
      });
      refetchLessons();
      closeDeleteModal();
    }

    if (isDeleteError) {
      const error = _.isObject(deleteError.errors) ? 'Input data is invalid.' : deleteError.errors;

      showNotification({
        id: 'deletelessonError',
        autoClose: 6000,
        title: 'Error!!!',
        message: error,
        color: 'red',
        icon: <IconX />,
        loading: false,
      });
    }
  }, [isDeleteSuccess, isDeleteError]);

  const deleteActionWrapper = () => {
    if (!isConfirmPassword) {
      openConfirmPasswordModal();
    } else {
      openDeleteModal();
    }
  };

  const confirmDelete = () => {
    deleteLesson({ lesson_id: lesson.id });
  };

  return (
    <>
      <Grid
        sx={(theme) => ({
          border: `1px solid ${theme.colors.lmsLayout[3]}`,
          borderRadius: 16,
          position: 'relative',
          overflow: 'hidden',
          width: '100%',
        })}
      >
        <Grid.Col
          span={12}
          xs={2}
          sx={(theme) => ({
            backgroundColor: theme.colors.lmsPrimary[0],
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '16px 0',
          })}
        >
          <Stack align="center" justify="center" spacing="xs">
            <ExtensionFileSvg extension={lesson.extension} size={60} style={{ opacity: 0.7 }} />
          </Stack>
        </Grid.Col>
        <Grid.Col
          span={12}
          xs={7}
          sx={(theme) => ({ backgroundColor: theme.colors.lmsSecondary[0] })}
        >
          <Stack>
            <Title order={5}> {lesson.name}</Title>

            <Text fz={12}>Uploaded: {uploadedDate}</Text>
            <Text fz={12}>Updated: {lessonUpdatedDate}</Text>
          </Stack>
        </Grid.Col>
        <Grid.Col
          span={12}
          xs={3}
          sx={(theme) => ({
            borderLeft: `1px solid ${theme.colors.lmsLayout[1]}`,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme.colors.yellow[0],
          })}
        >
          <Stack align="center" justify="center">
            <Flex align="center" justify="center" gap={8} wrap="wrap">
              <ActionIconWithTooltip tooltip="Edit Lesson" onClick={openEditLessonModal}>
                <FaEdit size={24} />
              </ActionIconWithTooltip>
              <ActionIconWithTooltip tooltip="Delete Lesson" onClick={deleteActionWrapper}>
                <MdDeleteForever size={24} />
              </ActionIconWithTooltip>
            </Flex>
          </Stack>
        </Grid.Col>
      </Grid>
      <EditLessonModal
        lesson={lesson}
        onSubmitHandle={onSubmitHandle}
        isLessonLoading={isUpdateLessonLoading}
        opened={openedEditLessonModal}
        close={closeEditLessonModal}
      />
      <ConfirmPasswordModal
        setIsConfirmPassword={setIsConfirmPassword}
        opened={openedConfirmPasswordModal}
        close={closeConfirmPasswordModal}
      />
      <DeleteModal
        title="Delete lesson"
        opened={openedDeleteModal}
        confirm={confirmDelete}
        close={closeDeleteModal}
        isDeleting={isDeleteLoading}
      >
        <Text>
          Are you sure to delete{' '}
          <Box
            component="span"
            sx={(theme) => ({
              color: theme.colors.red[6],
              fontWeight: 'bold',
              textDecoration: 'underline',
            })}
          >
            lesson {lesson.name}
          </Box>
        </Text>
        <br />
        <br />
        <Text>
          If you delete this lesson, then all videos, files of this lesson will also be deleted.
        </Text>
      </DeleteModal>
    </>
  );
}

export default LessonsCard;
