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

import { FaLink, FaSave, FaMoneyBillWave, FaDollarSign, FaPercent } from 'react-icons/fa';
import { BsFileFontFill } from 'react-icons/bs';
import { BiCategory } from 'react-icons/bi';
import { TiSortAlphabeticallyOutline } from 'react-icons/ti';

import inputStylesFull from '@/styles/inputStylesFull';
import { useForm, isEmail, hasLength } from '@mantine/form';
import Select from '@/components/common/form/Select';
import SwtichText from '@/components/common/SwitchText';
import DragDropInput from '../components/DragDropInput';
import { showNotification } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons';
import { useToggleStepMutation, useInsertOutcomesMutation } from '../../../api';

export function Outcomes({ course, refetchSteps, isEnabled }) {
  const [
    toggleStep,
    {
      isSuccess: isToggleStepSuccess,
      isLoading: isToggleStepLoading,
      isError: isToggleStepError,
      data: toggleStepData,
      error: toggleStepError,
    },
  ] = useToggleStepMutation();
  const [
    insertOutcomes,
    {
      isSuccess: isOutcomesSuccess,
      isLoading: isOutcomesLoading,
      isError: isOutcomesError,
      error: insertOutcomesError,
    },
  ] = useInsertOutcomesMutation();

  const [enabled, setEnabled] = useState(isEnabled);

  useEffect(() => {
    if (isToggleStepSuccess) {
      refetchSteps();
    }
    if (isToggleStepError) {
      const error = _.isObject(toggleStepError.errors)
        ? 'data is invalid.'
        : toggleStepError.errors;
      showNotification({
        id: 'toggleStepError',
        autoClose: 6000,
        title: 'Error!!!',
        message: error,
        color: 'red',
        icon: <IconX />,
        loading: false,
      });
    }
  }, [isToggleStepSuccess, isToggleStepError]);

  useEffect(() => {
    if (isOutcomesSuccess) {
      showNotification({
        id: 'insertRequiremntsSuccess',
        autoClose: 3000,
        title: `Requirements Created`,
        message: `Requirements has been created.`,
        color: 'teal',
        icon: <IconCheck />,
        loading: false,
      });
      refetchSteps();
    }
    if (isOutcomesError) {
      const error = _.isObject(insertOutcomesError.errors)
        ? 'data is invalid.'
        : insertOutcomesError.errors;
      showNotification({
        id: 'insertRequiremntsError',
        autoClose: 6000,
        title: 'Error!!!',
        message: error,
        color: 'red',
        icon: <IconX />,
        loading: false,
      });
    }
  }, [isOutcomesSuccess, isOutcomesError]);

  // useEffect(() => {}, [enabled]);

  const switchToggleEnable = (enable) => {
    console.log('enable : ', enable);
    toggleStep({ course_id: course.id, step: 'outcomes', key: 'enable', value: enable });
    setEnabled(enable);
  };

  const submitOutcomes = (outcomes) => {
    console.log('outcomes ....', outcomes);
    insertOutcomes({ outcomes, course_id: course.id });
  };

  return (
    <>
      <Paper p="md" withBorder sx={{ borderLeftWidth: 0, borderRadius: 0 }}>
        <Flex w="100%" align="center" justify="space-between">
          <Text>
            <b>Course:</b> {course.title}
          </Text>
          <Group position="right">
            <SwtichText
              onLabel="Enabled"
              offLabel="Disabled"
              checked={enabled}
              setChecked={switchToggleEnable}
            />
          </Group>
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
          {!enabled && <Overlay />}
          <DragDropInput
            buttonName="Add Outcome"
            placeholder="Course outcome e.g. you will become high demand graphic designer."
            data={course?.course_attributes?.outcomes || [{ name: '' }]}
            submitData={submitOutcomes}
            savingData={isOutcomesLoading}
          />
        </Stack>
      </Paper>
    </>
  );
}

export default Outcomes;
