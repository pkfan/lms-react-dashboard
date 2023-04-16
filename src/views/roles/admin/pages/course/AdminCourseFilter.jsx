import { Stack, Divider, TextInput, Flex, Loader, Text, Select, createStyles } from '@mantine/core';
import inputStylesFull from '@/styles/inputStylesFull';
import { IconX } from '@tabler/icons';
import { useGetInstructorsQuery } from '../../api';
import { Query } from '@/lib/cogent-js';
import Button from '@/components/common/Button';
import { ImFilter } from 'react-icons/im';
import randomNumber from '@/helpers/randomNumber';

const useStyles = createStyles((theme) => ({
  inputStyles: {
    // margin: '0 16px',
    '& input': {
      backgroundColor: theme.colors.lmsLayout[1],
    },
    '& input::placeholder': {
      color: theme.colors.lmsLayout[4],
    },
    // [`@media (min-width: ${theme.breakpoints.sm}px)`]: {
    //   margin: '0 32px',
    // },
  },
}));

export function AdminCourseFilter({
  instructorId,
  setInstructorId,
  courseTitle,
  setCourseTitle,
  submitFilterWrapper,
}) {
  const { classes } = useStyles();

  const generateUrlQuery = () => {
    const query = new Query();
    const urlQuery = query
      .for('admin/instructors') // the model you're selecting
      .sort('full_name')
      .get();
    // console.log('Query urlQuery::::: ', urlQuery);
    // alert('app loaded');
    return urlQuery;
  };
  const {
    isSuccess: isGetInstructorsSuccess,
    isFetching: isGetInstructorsFetching,
    isError: isGetInstructorsError,
    data: instructorsData,
  } = useGetInstructorsQuery({ url: generateUrlQuery() });

  const transformData = () => {
    // const item = { value: 'rick', label: 'Rick' };

    const data = instructorsData.map((instructor) => ({
      value: instructor.id,
      label: instructor.full_name,
    }));

    return data;
  };

  return (
    <Stack spacing="xs">
      <Divider my="xs" label="Label in the center" labelPosition="center" />
      <TextInput
        className={classes.inputStyles}
        label="Course"
        name="title"
        placeholder="type words"
        value={courseTitle}
        onChange={(event) => setCourseTitle(event.currentTarget.value)}
      />

      {isGetInstructorsFetching && (
        <Flex align="center" justify="center">
          <Loader size="sm" />
        </Flex>
      )}
      {isGetInstructorsError && (
        <Flex align="center" justify="center" sx={(theme) => ({ color: theme.colors.red[5] })}>
          <IconX size={16} />
          <Text>Error to load instructors, Please refresh browser.</Text>
        </Flex>
      )}
      {isGetInstructorsSuccess && (
        <Select
          searchable
          nothingFound="No Found"
          dropdownPosition="bottom"
          maxDropdownHeight={400}
          className={classes.inputStyles}
          label="Instructor"
          placeholder="all"
          data={transformData()}
          value={instructorId}
          onChange={setInstructorId}
          filter={(value, item) => item.label.toLowerCase().includes(value.toLowerCase().trim())}
        />
      )}
      <Button
        onClick={() => submitFilterWrapper(randomNumber())}
        color="lmsSecondary"
        leftIcon={<ImFilter size={18} />}
        loading={false}
        my={16}
      >
        Filter
      </Button>
    </Stack>
  );
}

export default AdminCourseFilter;
