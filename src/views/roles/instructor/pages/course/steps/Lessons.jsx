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
  Group,
  Paper,
  Loader,
} from '@mantine/core';
import Overlay from '@/components/common/Overlay';

import Button from '@/components/common/Button';
import Switch from '@/components/common/Switch';
import { Link } from 'react-router-dom';

import { FaLink, FaSave, FaMoneyBillWave, FaDollarSign, FaPercent } from 'react-icons/fa';
import { BsUpload } from 'react-icons/bs';
import { RiVideoUploadFill } from 'react-icons/ri';
import { TiSortAlphabeticallyOutline } from 'react-icons/ti';

import inputStylesFull from '@/styles/inputStylesFull';
import { useForm, isEmail, hasLength } from '@mantine/form';
import Select from '@/components/common/form/Select';
import SwtichText from '@/components/common/SwitchText';
import DragDropInput from '../components/DragDropInput';
import { showNotification } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons';
import { useToggleStepMutation, useInsertLessonsMutation } from '../../../api';

export function Lessons({ course }) {
  return (
    <>
      <Paper p="md" withBorder sx={{ borderLeftWidth: 0, borderRadius: 0 }}>
        <Flex w="100%" align="center" justify="space-between">
          <Text>
            <b>Course:</b> {course.title}
          </Text>
        </Flex>
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
          <Stack w="70%" mx="auto" justify="center" align="center">
            <RiVideoUploadFill size={150} style={{ opacity: 0.7 }} />

            <Button
              component={Link}
              to="/dashboard/instructor/lessons"
              type="submit"
              color="lmsLayout"
              leftIcon={<BsUpload size={18} />}
            >
              Upload Lessons and Files
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </>
  );
}

export default Lessons;
