import { useState, useEffect } from 'react';
import { Grid, Stack, Box, Title, Text, Flex, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { showNotification } from '@mantine/notifications';
import { ActionIconWithTooltip, SwtichText, DeleteModal } from '@/components';
import { chapterVisibility } from '@/enums';
import {
  useUpdateChapterMutation,
  useUpdateChapterVisibilityMutation,
  useDeleteChapterMutation,
} from '@/views/education/instructor/api';
import { IconCheck, IconX, MdMenuBook, MdDeleteForever, FaEdit } from '@/components/icons';
import EditChapterModal from './EditChapterModal';

export function ChapterCard({ chapter, refetchChapters }) {
  const [openedEditChapterModal, { open: openEditChapterModal, close: closeEditChapterModal }] =
    useDisclosure(false);
  const [openedDeleteModal, { open: openDeleteModal, close: closeDeleteModal }] =
    useDisclosure(false);

  const initVisibility = chapterVisibility(chapter.visibility) == 'private';
  const [isPrivate, setIsPrivate] = useState(initVisibility);

  // update chapter
  const [
    updateChapter,
    {
      isSuccess: isUpdateChapterSuccess,
      isLoading: isUpdateChapterLoading,
      isError: isUpdateChapterError,
      error: updateChapterError,
    },
  ] = useUpdateChapterMutation();

  useEffect(() => {
    if (isUpdateChapterSuccess) {
      showNotification({
        id: 'updateChapterSuccess',
        autoClose: 3000,
        title: `Chapter Created`,
        message: `Chapter has been created.`,
        color: 'teal',
        icon: <IconCheck />,
        loading: false,
      });
      refetchChapters();
      closeEditChapterModal();
    }

    if (isUpdateChapterError) {
      const error = _.isObject(updateChapterError.errors)
        ? 'Input data is invalid.'
        : updateChapterError.errors;

      showNotification({
        id: 'updateChapterError',
        autoClose: 6000,
        title: 'Error!!!',
        message: error,
        color: 'red',
        icon: <IconX />,
        loading: false,
      });
    }
  }, [isUpdateChapterSuccess, isUpdateChapterError]);

  const onSubmitHandle = (values) => {
    values['chapter_id'] = chapter.id;
    console.log('chapters  values....', values);
    // createChapter(values);
    updateChapter(values);
  };

  // update visibility chapter
  const [
    updateChapterVisibility,
    {
      isSuccess: isUpdateChapterVisibilitySuccess,
      isLoading: isUpdateChapterVisibilityLoading,
      isError: isUpdateChapterVisibilityError,
      error: updateChapterVisibilityError,
    },
  ] = useUpdateChapterVisibilityMutation();

  useEffect(() => {
    if (isUpdateChapterVisibilitySuccess) {
      refetchChapters();
    }

    if (isUpdateChapterVisibilityError) {
      const error = _.isObject(updateChapterVisibilityError.errors)
        ? 'Input data is invalid.'
        : updateChapterVisibilityError.errors;

      showNotification({
        id: 'updateChapterVisibilityError',
        autoClose: 6000,
        title: 'Error!!!',
        message: error,
        color: 'red',
        icon: <IconX />,
        loading: false,
      });
    }
  }, [isUpdateChapterVisibilityError, isUpdateChapterVisibilitySuccess]);

  const setChapterVisibility = (isPrivateVisibility) => {
    const values = {};
    values['chapter_id'] = chapter.id;
    values['visibility'] = isPrivateVisibility ? 'private' : 'public';
    updateChapterVisibility(values);
    setIsPrivate(isPrivateVisibility);
  };

  // chapter delete
  const [
    deleteChapter,
    {
      isSuccess: isDeleteChapterSuccess,
      isLoading: isDeleteChapterLoading,
      isError: isDeleteChapterError,
      error: deleteChapterError,
    },
  ] = useDeleteChapterMutation();

  useEffect(() => {
    if (isDeleteChapterSuccess) {
      showNotification({
        id: 'deleteChapterSuccess',
        autoClose: 3000,
        title: `Chapter deleted`,
        message: `Chapter has been deleted.`,
        color: 'teal',
        icon: <IconCheck />,
        loading: false,
      });
      refetchChapters();
      closeDeleteModal();
    }

    if (isDeleteChapterError) {
      const error = _.isObject(deleteChapterError.errors)
        ? 'Input data is invalid.'
        : deleteChapterError.errors;

      showNotification({
        id: 'deleteChapterError',
        autoClose: 6000,
        title: 'Error!!!',
        message: error,
        color: 'red',
        icon: <IconX />,
        loading: false,
      });
    }
  }, [isDeleteChapterSuccess, isDeleteChapterError]);

  const confirmDelete = () => {
    deleteChapter({ chapter_id: chapter.id });
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
          })}
        >
          <Stack align="center" justify="center" spacing="xs">
            <MdMenuBook size={48} style={{ opacity: 0.7 }} />
            <Title order={4}>Chapter {chapter.number}</Title>
          </Stack>
        </Grid.Col>
        <Grid.Col
          span={12}
          xs={7}
          sx={(theme) => ({ backgroundColor: theme.colors.lmsSecondary[0] })}
        >
          <Stack>
            <Title order={5}> {chapter.name}</Title>
            <Text fz={12}>{chapter.description}</Text>
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
              <ActionIconWithTooltip tooltip="Edit Chapter" onClick={openEditChapterModal}>
                <FaEdit size={24} />
              </ActionIconWithTooltip>
              <ActionIconWithTooltip tooltip="Delete Chapter" onClick={openDeleteModal}>
                <MdDeleteForever size={24} />
              </ActionIconWithTooltip>
            </Flex>
            <Flex align="center" justify="center" gap={8} wrap="wrap">
              <SwtichText
                onLabel="private"
                offLabel="public"
                checked={isPrivate}
                setChecked={setChapterVisibility}
                color="lmsPrimary"
              />
            </Flex>
          </Stack>
        </Grid.Col>
      </Grid>
      <EditChapterModal
        chapter={chapter}
        onSubmitHandle={onSubmitHandle}
        isChapterLoading={isUpdateChapterLoading}
        opened={openedEditChapterModal}
        close={closeEditChapterModal}
      />
      <DeleteModal
        title="Delete Chapter"
        opened={openedDeleteModal}
        confirm={confirmDelete}
        close={closeDeleteModal}
        isDeleting={isDeleteChapterLoading}
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
            chapter {chapter.number}
          </Box>
        </Text>
        <br />
        <br />
        <Text>
          If you delete this chapter, then all leesons (e.g. videos, files) of this chapter will
          also be deleted.
        </Text>
      </DeleteModal>
    </>
  );
}

export default ChapterCard;
