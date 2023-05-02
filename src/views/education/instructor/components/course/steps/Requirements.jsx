import _ from 'lodash';
import { useState, useEffect } from 'react';
import { Stack, Flex, Group, Paper, Loader, Text } from '@mantine/core';
import { Overlay, SwtichText } from '@/components';
import { showNotification } from '@mantine/notifications';
import { DragDropInput } from '@/views/education/instructor/components';
import {
  useToggleStepMutation,
  useInsertRequirementsMutation,
} from '@/views/education/instructor/api';
import { IconCheck, IconX } from '@/components/icons';

export function Requirements({ course, refetchSteps, isEnabled }) {
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
    insertRequirements,
    {
      isSuccess: isInsertRequirementsSuccess,
      isLoading: isInsertRequirementsLoading,
      isError: isInsertRequirementsError,
      error: insertRequirementsError,
    },
  ] = useInsertRequirementsMutation();

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
    if (isInsertRequirementsSuccess) {
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
    if (isInsertRequirementsError) {
      const error = _.isObject(insertRequirementsError.errors)
        ? 'data is invalid.'
        : insertRequirementsError.errors;
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
  }, [isInsertRequirementsSuccess, isInsertRequirementsError]);

  // useEffect(() => {}, [enabled]);

  const switchToggleEnable = (enable) => {
    console.log('enable : ', enable);
    toggleStep({ course_id: course.id, step: 'requirements', key: 'enable', value: enable });
    setEnabled(enable);
  };

  const submitRequirements = (requirements) => {
    console.log('requirements ....', requirements);
    insertRequirements({ requirements, course_id: course.id });
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
            buttonName="Add Requirement"
            placeholder="Course requirement e.g. A computer with internet connection is required to take this course "
            data={course?.course_attributes?.requirements || [{ name: '' }]}
            submitData={submitRequirements}
            savingData={isInsertRequirementsLoading}
          />
        </Stack>
      </Paper>
    </>
  );
}

export default Requirements;
