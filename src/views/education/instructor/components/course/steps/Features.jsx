import _ from 'lodash';
import { useState, useEffect } from 'react';
import { Stack, Flex, Text, Group, Paper, Loader } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { Overlay, SwtichText } from '@/components';
import { DragDropInput } from '@/views/education/instructor/components';
import { useToggleStepMutation, useInsertFeaturesMutation } from '@/views/education/instructor/api';
import { IconCheck, IconX } from '@/components/icons';

export function Features({ course, refetchSteps, isEnabled }) {
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
      const error = _.isObject(insertFeaturesError.errors)
        ? 'data is invalid.'
        : insertFeaturesError.errors;
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
  }, [isFeaturesSuccess, isFeaturesError]);

  // useEffect(() => {}, [enabled]);

  const switchToggleEnable = (enable) => {
    console.log('enable : ', enable);
    toggleStep({ course_id: course.id, step: 'features', key: 'enable', value: enable });
    setEnabled(enable);
  };

  const submitFeatures = (features) => {
    console.log('features ....', features);
    insertFeatures({ features, course_id: course.id });
  };

  return (
    <>
      <Paper p="md" withBorder sx={{ borderLeftWidth: 0, borderRadius: 0 }}>
        <Flex w="100%" align="center" justify="space-between">
          <Text>
            <b>Course:</b> {course.title}
          </Text>
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
            data={course?.course_attributes?.features || [{ name: '' }]}
            submitData={submitFeatures}
            savingData={isFeaturesLoading}
          />
        </Stack>
      </Paper>
    </>
  );
}

export default Features;
