import _ from 'lodash';
import { useState, useEffect } from 'react';
import {
  TextInput,
  Stack,
  Flex,
  Title,
  Divider,
  Radio,
  Box,
  Text,
  Paper,
  Textarea,
  NumberInput,
  Loader,
  Modal,
  Group,
} from '@mantine/core';

import Button from '@/components/common/Button';

import { ImEyeBlocked, ImEye } from 'react-icons/im';
import { BiAddToQueue, BiError } from 'react-icons/bi';

import { useForm, isEmail, hasLength } from '@mantine/form';
import SwtichText from '@/components/common/SwitchText';

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
