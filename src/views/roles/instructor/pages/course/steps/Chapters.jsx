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
} from '@mantine/core';
import Overlay from '@/components/common/Overlay';

import Button from '@/components/common/Button';
import Switch from '@/components/common/Switch';

import { FaLink, FaSave, FaMoneyBillWave, FaDollarSign, FaPercent } from 'react-icons/fa';
import { BsFileFontFill } from 'react-icons/bs';
import { BiCategory } from 'react-icons/bi';
import { TiSortAlphabeticallyOutline } from 'react-icons/ti';

import inputStylesFull from '@/styles/inputStylesFull';
import { useForm, isEmail, hasLength } from '@mantine/form';
import Select from '@/components/common/form/Select';
import SwtichText from '@/components/common/SwitchText';
import DragDropInput from '../components/DragDropInput';

export function Chapters() {
  const submitChapters = (chapters) => {
    console.log('chapters ....', chapters);
  };

  return (
    <>
      <Paper p="md" withBorder sx={{ borderLeftWidth: 0, borderRadius: 0 }}>
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
          <DragDropInput
            buttonName="Add Chapter"
            placeholder="Course chapter e.g. Introduction to mathematics algebra"
            data={[
              { id: 1, name: 'John Doe' },
              { id: 2, name: 'Bill Love' },
              { id: 3, name: 'Nancy Eagle' },
              { id: 4, name: 'Lim Notch' },
              { id: 5, name: 'Susan Seven' },
            ]}
            submitData={submitChapters}
          />
        </Stack>
      </Paper>
    </>
  );
}

export default Chapters;
