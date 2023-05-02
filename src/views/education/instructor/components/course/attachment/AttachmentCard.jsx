import _ from 'lodash';
import { useState, useEffect } from 'react';
import { Grid, Stack, Box, Title, Text, Flex } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { showNotification } from '@mantine/notifications';
import {
  useUpdateAttachmentMutation,
  useDeleteAttachmentMutation,
} from '@/views/education/instructor/api';
import {
  ActionIconWithTooltip,
  DeleteModal,
  ExtensionFileSvg,
  ConfirmPasswordModal,
} from '@/components';
import { formatDistance } from 'date-fns';
import { FaEdit, IconCheck, IconX, MdDeleteForever } from '@/components/icons';
import EditAttachmentModal from './EditAttachmentModal';

export function AttachmentCard({ attachment, refetchAttachments }) {
  const [
    openedEditAttachmentModal,
    { open: openEditAttachmentModal, close: closeEditAttachmentModal },
  ] = useDisclosure(false);
  const [openedDeleteModal, { open: openDeleteModal, close: closeDeleteModal }] =
    useDisclosure(false);

  // confirm password
  const [isConfirmPassword, setIsConfirmPassword] = useState(false);
  const [
    openedConfirmPasswordModal,
    { open: openConfirmPasswordModal, close: closeConfirmPasswordModal },
  ] = useDisclosure(false);

  let uploadedDate = formatDistance(new Date(attachment.created_at), new Date(), {
    addSuffix: true,
  });
  let attachmentUpdatedDate = formatDistance(new Date(attachment.updated_at), new Date(), {
    addSuffix: true,
  });

  const [
    updateAttachment,
    {
      isSuccess: isUpdateAttachmentSuccess,
      isLoading: isUpdateAttachmentLoading,
      isError: isUpdateAttachmentError,
      error: updateAttachmentError,
    },
  ] = useUpdateAttachmentMutation();

  useEffect(() => {
    if (isUpdateAttachmentSuccess) {
      showNotification({
        id: 'updateAttachmentSuccess',
        autoClose: 3000,
        title: `Attachment updated`,
        message: `Attachment has been updated.`,
        color: 'teal',
        icon: <IconCheck />,
        loading: false,
      });
      refetchAttachments();
      closeEditAttachmentModal();
    }

    if (isUpdateAttachmentError) {
      const error = _.isObject(updateAttachmentError.errors)
        ? 'Input data is invalid.'
        : updateAttachmentError.errors;

      showNotification({
        id: 'updateAttachmentError',
        autoClose: 6000,
        title: 'Error!!!',
        message: error,
        color: 'red',
        icon: <IconX />,
        loading: false,
      });
    }
  }, [isUpdateAttachmentSuccess, isUpdateAttachmentError]);

  const onSubmitHandle = (values) => {
    values['course_attachment_id'] = attachment.id;
    console.log('attachment  values....', values);
    updateAttachment(values);
  };

  const [
    deleteAttachment,
    {
      isSuccess: isDeleteSuccess,
      isLoading: isDeleteLoading,
      isError: isDeleteError,
      error: deleteError,
    },
  ] = useDeleteAttachmentMutation();

  useEffect(() => {
    if (isDeleteSuccess) {
      showNotification({
        id: 'deleteDeleteSuccess',
        autoClose: 3000,
        title: `Attachment deleted`,
        message: `Attachment has been deleted.`,
        color: 'teal',
        icon: <IconCheck />,
        loading: false,
      });
      refetchAttachments();
      closeDeleteModal();
    }

    if (isDeleteError) {
      const error = _.isObject(deleteError.errors) ? 'Input data is invalid.' : deleteError.errors;

      showNotification({
        id: 'deleteAttachmentError',
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
    deleteAttachment({ course_attachment_id: attachment.id });
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
            <ExtensionFileSvg extension={attachment.extension} size={60} style={{ opacity: 0.7 }} />
          </Stack>
        </Grid.Col>
        <Grid.Col
          span={12}
          xs={7}
          sx={(theme) => ({ backgroundColor: theme.colors.lmsSecondary[0] })}
        >
          <Stack>
            <Title order={5}> {attachment.name}</Title>

            <Text fz={12}>Uploaded: {uploadedDate}</Text>
            <Text fz={12}>Updated: {attachmentUpdatedDate}</Text>
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
              <ActionIconWithTooltip tooltip="Edit Attachment" onClick={openEditAttachmentModal}>
                <FaEdit size={24} />
              </ActionIconWithTooltip>
              <ActionIconWithTooltip tooltip="Delete Attachment" onClick={deleteActionWrapper}>
                <MdDeleteForever size={24} />
              </ActionIconWithTooltip>
            </Flex>
          </Stack>
        </Grid.Col>
      </Grid>
      <EditAttachmentModal
        attachment={attachment}
        onSubmitHandle={onSubmitHandle}
        isAttachmentLoading={isUpdateAttachmentLoading}
        opened={openedEditAttachmentModal}
        close={closeEditAttachmentModal}
      />
      <ConfirmPasswordModal
        setIsConfirmPassword={setIsConfirmPassword}
        opened={openedConfirmPasswordModal}
        close={closeConfirmPasswordModal}
      />
      <DeleteModal
        title="Delete Attachment"
        opened={openedDeleteModal}
        confirm={confirmDelete}
        close={closeDeleteModal}
        isDeleting={isDeleteLoading}
      >
        <Text>
          Are you sure to delete attachment file:{' '}
          <Box
            component="span"
            sx={(theme) => ({
              color: theme.colors.red[6],
              fontWeight: 'bold',
              textDecoration: 'underline',
            })}
          >
            {attachment.name}
          </Box>
        </Text>
      </DeleteModal>
    </>
  );
}

export default AttachmentCard;
