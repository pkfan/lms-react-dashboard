import _ from 'lodash';
import { useState, useEffect } from 'react';
import { Paper, Flex, Loader, Text } from '@mantine/core';
import Button from '@/components/common/Button';
import TextEditor from '@/views/tip-tap-editor/TextEditor';
import { FaSave } from 'react-icons/fa';
import { useInsertDescriptionMutation, useGetDescriptionQuery } from '../../../api';
import { showNotification } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons';

export function Description({ refetchSteps, course }) {
  const [descriptionHtml, setDescriptionHtml] = useState(null);

  const [
    insertDescription,
    {
      isLoading: isInsertDescriptionLoading,
      isSuccess: isInsertDescriptionSuccess,
      error: insertDescriptionError,
      data: insertDescriptionData,
      isError: isInsertDescriptionError,
    },
  ] = useInsertDescriptionMutation();

  const {
    isSuccess: isGetDescriptionSuccess,
    isFetching: isGetDescriptionFetching,
    isError: isGetDescriptionError,
    data: descriptionData,
  } = useGetDescriptionQuery(course.id);

  useEffect(() => {
    if (descriptionHtml) {
      insertDescription({ description: descriptionHtml, course_id: course.id });
    }
  }, [descriptionHtml]);

  useEffect(() => {
    if (isInsertDescriptionSuccess) {
      showNotification({
        id: 'insertDescriptionSuccess',
        autoClose: 3000,
        title: 'Course Description Created',
        message: `Course Description step has been completed.`,
        color: 'teal',
        icon: <IconCheck />,
        loading: false,
      });
      refetchSteps();
    }
    if (isInsertDescriptionError) {
      const error = _.isObject(insertDescriptionError.errors)
        ? 'data is invalid.'
        : insertDescriptionError.errors;
      showNotification({
        id: 'insertDescriptionError',
        autoClose: 6000,
        title: 'Error!!!',
        message: error,
        color: 'red',
        icon: <IconX />,
        loading: false,
      });
    }
  }, [isInsertDescriptionSuccess, isInsertDescriptionError]);

  return (
    <Paper p="md" withBorder sx={{ borderLeftWidth: 0, borderRadius: 0 }}>
      {/* <Flex w="100%" align="center" justify="end">
        <Button compact color="lmsLayout" leftIcon={<FaSave size={16} />}>
          save
        </Button>
      </Flex> */}
      {isGetDescriptionFetching && (
        <Flex align="center" justify="center">
          <Loader size="sm" />
        </Flex>
      )}
      {isGetDescriptionError && (
        <Flex align="center" justify="center" sx={(theme) => ({ color: theme.colors.red[5] })}>
          <IconX size={16} />
          <Text>Error to load Description, Please refresh browser.</Text>
        </Flex>
      )}
      {isGetDescriptionSuccess && (
        <TextEditor
          sx={{ margin: 8, marginTop: 36 }}
          saveButtonStyle={{ position: 'absolute', top: '-34px', right: '-11px' }}
          setDescriptionHtml={setDescriptionHtml}
          savingDescription={isInsertDescriptionLoading}
          content={descriptionData}
        />
      )}
      {isInsertDescriptionError && (
        <Flex align="center" justify="center" sx={(theme) => ({ color: theme.colors.red[5] })}>
          <IconX size={16} />
          <Text>{insertDescriptionError.errors.description}</Text>
        </Flex>
      )}
    </Paper>
  );
}

export default Description;
