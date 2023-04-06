import { useEffect, useState, useRef } from 'react';
import { Flex, Stack, Title, Box, Loader, Text, Group } from '@mantine/core';
import { FiRefreshCw } from 'react-icons/fi';
import { FaSave } from 'react-icons/fa';
import { IconX, IconCheck } from '@tabler/icons';

import Button from '@/components/common/Button';
import ButtonWhite from '@/components/common/ButtonWhite';
import NotFoundImage from '@/components/images/NotFoundImage';
import { useGetAttachmentsQuery, useSortAttachmentsMutation } from '@/views/roles/instructor/api';
import DragDropFiles from './DragDropFiles';
import { showNotification } from '@mantine/notifications';

export function SortAttachments({ courseId }) {
  const [sortFiles, setSortFiles] = useState(null);

  const {
    isSuccess: isGetAttachmentsSuccess,
    isFetching: isGetAttachmentsFetching,
    isError: isGetAttachmentsError,
    data: attachments,
    refetch: refetchAttachments,
  } = useGetAttachmentsQuery(courseId);

  const [
    sortAttachmentsData,
    {
      isSuccess: isSortAttachmentsSuccess,
      isLoading: isSortAttachmentsLoading,
      isError: isSortAttachmentsError,
      error: sortAttachmentsError,
    },
  ] = useSortAttachmentsMutation();

  useEffect(() => {
    if (isSortAttachmentsSuccess) {
      showNotification({
        id: 'sortAttachmentsSuccess',
        autoClose: 3000,
        title: 'Attachment files sorted successfully',
        message: `Attachment files has been sorted and saved.`,
        color: 'teal',
        icon: <IconCheck />,
        loading: false,
      });
    }
  }, [isSortAttachmentsSuccess]);

  useEffect(() => {
    if (!isGetAttachmentsFetching) {
      setSortFiles(attachments);
    }
  }, [!isGetAttachmentsFetching]);

  const onSubmitHandle = () => {
    if (!sortFiles) return;
    const finalSortAttachments = sortFiles.map((attachment, index) => ({
      attachment_id: attachment.id,
      sort: index + 1,
    }));
    console.log('finalSortAttachments : ', finalSortAttachments);
    sortAttachmentsData({ attachments: finalSortAttachments });
  };

  return (
    <>
      <Flex w="100%" justify="space-between" align="center" py={12}>
        <Title order={4}>Drag & Drop to sort files</Title>
        <Group gap={8}>
          <ButtonWhite leftIcon={<FiRefreshCw size={18} />} onClick={refetchAttachments}>
            Refresh
          </ButtonWhite>
          <Button
            onClick={onSubmitHandle}
            color="lmsLayout"
            leftIcon={<FaSave size={18} />}
            loading={isSortAttachmentsLoading}
          >
            save
          </Button>
        </Group>
      </Flex>

      <Stack
        justify="center"
        align="center"
        sx={(theme) => ({
          width: '100%',
          height: '100%',
        })}
      >
        {isSortAttachmentsError && (
          <Flex align="center" justify="center" sx={(theme) => ({ color: theme.colors.red[5] })}>
            <IconX size={16} />
            <Text>
              Error:{' '}
              {typeof sortAttachmentsError.errors == 'string'
                ? sortAttachmentsError.errors
                : 'files could not be sorted, please try later.'}
            </Text>
          </Flex>
        )}
        {isGetAttachmentsFetching && (
          <Flex align="center" justify="center" p={50}>
            <Loader size="md" />
          </Flex>
        )}
        <Flex direction="column" p={4} mt={16} w="70%" mx="auto">
          {isGetAttachmentsSuccess && sortFiles?.length > 0 && (
            <DragDropFiles items={sortFiles} setitems={setSortFiles} />
          )}
        </Flex>

        {isGetAttachmentsSuccess && sortFiles?.length <= 0 && (
          <NotFoundImage width={450} message="There are no attachment files for this course" />
        )}

        {isGetAttachmentsError && (
          <Flex align="center" justify="center" sx={(theme) => ({ color: theme.colors.red[5] })}>
            <IconX size={16} />
            <Text>Error to load attachment files, Please refresh browser.</Text>
          </Flex>
        )}
      </Stack>
    </>
  );
}

export default SortAttachments;
