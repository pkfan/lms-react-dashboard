import { Flex, Stack, Title, Box, Loader, Text } from '@mantine/core';
import { ButtonWhite, NotFoundImage } from '@/components';
import { useGetAttachmentsQuery } from '@/views/education/instructor/api';
import { IconX, FiRefreshCw } from '@/components/icons';
import AttachmentCard from './AttachmentCard';

export function Attachments({ courseId }) {
  const {
    isSuccess: isGetAttachmentsSuccess,
    isFetching: isGetAttachmentsFetching,
    isError: isGetAttachmentsError,
    data: attachments,
    refetch: refetchAttachments,
  } = useGetAttachmentsQuery(courseId);

  return (
    <>
      <Flex w="100%" justify="space-between" align="center" py={12}>
        <Title order={4}>Total Attachments: {attachments?.length}</Title>
        <Box>
          <ButtonWhite leftIcon={<FiRefreshCw size={18} />} onClick={refetchAttachments}>
            Refresh
          </ButtonWhite>
        </Box>
      </Flex>

      <Stack
        justify="center"
        align="center"
        sx={(theme) => ({
          width: '100%',
          height: '100%',
        })}
      >
        {isGetAttachmentsFetching && (
          <Flex align="center" justify="center" p={50}>
            <Loader size="md" />
          </Flex>
        )}
        <Flex direction="column" p={16} mt={16} gap={36} w="85%" mx="auto">
          {isGetAttachmentsSuccess &&
            attachments.length > 0 &&
            attachments.map((attachment) => (
              <AttachmentCard
                key={attachment.id}
                attachment={attachment}
                refetchAttachments={refetchAttachments}
              />
            ))}
        </Flex>

        {isGetAttachmentsSuccess && attachments?.length <= 0 && (
          <NotFoundImage width={450} message="There are no attachment files for this course" />
        )}

        {isGetAttachmentsError && (
          <Flex align="center" justify="center" sx={(theme) => ({ color: theme.colors.red[5] })}>
            <IconX size={16} />
            <Text>Error to load Attachment Files, Please refresh browser.</Text>
          </Flex>
        )}
      </Stack>
    </>
  );
}

export default Attachments;
