import _ from 'lodash';
import { TextInput, Stack, Modal } from '@mantine/core';
import { useForm, hasLength } from '@mantine/form';
import { Button } from '@/components';
import { BiAddToQueue } from '@/components/icons';

export function EditAttachmentModal({
  attachment,
  onSubmitHandle,
  isAttachmentLoading,
  opened,
  close,
}) {
  const form = useForm({
    initialValues: {
      name: attachment?.name || '',
    },

    validate: {
      name: hasLength({ min: 4 }, 'Too short'),
    },
  });

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="Edit Course Attachment"
        size="xl"
        sx={(theme) => ({
          '& .mantine-Modal-title': {
            fontWeight: 'bold',
            fontSize: '20px',
            color: theme.colors.lmsPrimary[6],
          },
        })}
      >
        <form onSubmit={form.onSubmit(onSubmitHandle)} style={{ width: '100%' }}>
          <Stack w="70%" mx="auto">
            <TextInput
              sx={(theme) => ({
                width: '100%',
                '& input': {
                  backgroundColor: theme.colors.lmsLayout[1],
                },
                '& input::placeholder': {
                  color: theme.colors.lmsLayout[4],
                },
              })}
              withAsterisk
              label="File Name"
              placeholder="Enter File Name"
              {...form.getInputProps(`name`)}
            />

            <Button
              type="submit"
              color="lmsSecondary"
              leftIcon={<BiAddToQueue size={18} />}
              loading={isAttachmentLoading}
            >
              Update Attachment
            </Button>
          </Stack>
        </form>
      </Modal>
    </>
  );
}

export default EditAttachmentModal;
