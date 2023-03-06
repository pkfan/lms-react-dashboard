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
import { useToggleStepMutation, useInsertFeaturesMutation } from '../../../api';

export function Features({ course_id, refetchSteps, isEnabled }) {
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
    insertFeatures,
    {
      isSuccess: isFeaturesSuccess,
      isLoading: isFeaturesLoading,
      isError: isFeaturesError,
      error: insertFeaturesError,
    },
  ] = useInsertFeaturesMutation();

  const [enabled, setEnabled] = useState(isEnabled);

  useEffect(() => {
    if (isToggleStepSuccess) {
      const toggleMessage = enabled ? 'Enabled' : 'Disabled';
      showNotification({
        id: 'toggleStepSuccess',
        autoClose: 3000,
        title: `Features ${toggleMessage}.`,
        message: `Features has been ${toggleMessage}.`,
        color: 'teal',
        icon: <IconCheck />,
        loading: false,
      });
      console.log('toggleStepData : ', toggleStepData);
      refetchSteps();
    }
    if (isToggleStepError) {
      showNotification({
        id: 'toggleStepError',
        autoClose: 6000,
        title: 'Error!!!',
        message: toggleStepError.errors,
        color: 'red',
        icon: <IconX />,
        loading: false,
      });
    }
  }, [isToggleStepSuccess, isToggleStepError]);

  useEffect(() => {
    if (isFeaturesSuccess) {
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
    if (isFeaturesError) {
      showNotification({
        id: 'insertRequiremntsError',
        autoClose: 6000,
        title: 'Error!!!',
        message: insertFeaturesError.errors,
        color: 'red',
        icon: <IconX />,
        loading: false,
      });
    }
  }, [isFeaturesSuccess, isFeaturesError]);

  // useEffect(() => {}, [enabled]);

  const switchToggleEnable = (enable) => {
    console.log('enable : ', enable);
    toggleStep({ course_id, step: 'features', key: 'enable', value: enable });
    setEnabled(enable);
  };

  const submitFeatures = (features) => {
    console.log('features ....', features);
    insertFeatures({ features, course_id });
  };

  return (
    <>
      <Paper p="md" withBorder sx={{ borderLeftWidth: 0, borderRadius: 0 }}>
        <Flex w="100%" align="center" justify="end">
          <Group position="right">
            {isToggleStepLoading && <Loader size="xs" />}
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
            buttonName="Add Feature"
            placeholder="Course Feature e.g. This course contain high quality content and great benefits for students."
            data={[
              { name: 'John Doe' },
              { name: 'Bill Love' },
              { name: 'Nancy Eagle' },
              { name: 'Lim Notch' },
              { name: 'Susan Seven' },
            ]}
            submitData={submitFeatures}
            savingData={isFeaturesLoading}
          />
        </Stack>
      </Paper>
    </>
  );
}

export default Features;
