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

export function EditLessonModal({ lesson, onSubmitHandle, isLessonLoading, opened, close }) {
  const form = useForm({
    initialValues: {
      name: lesson?.name || '',
      description: lesson?.description || '',
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
        title="Edit Lesson"
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
              label="Lesson Name"
              placeholder="Enter Lesson Name"
              {...form.getInputProps(`name`)}
            />
            <Textarea
              sx={(theme) => ({
                width: '100%',
                '& textarea': {
                  backgroundColor: theme.colors.lmsLayout[1],
                },
                '& textarea::placeholder': {
                  color: theme.colors.lmsLayout[4],
                },
              })}
              withAsterisk
              label="Lesson Description"
              placeholder="Enter Lesson Description"
              minRows={3}
              {...form.getInputProps(`description`)}
            />
            <Button
              type="submit"
              color="lmsSecondary"
              leftIcon={<BiAddToQueue size={18} />}
              loading={isLessonLoading}
            >
              Update Lesson
            </Button>
          </Stack>
        </form>
      </Modal>
    </>
  );
}

export default EditLessonModal;
