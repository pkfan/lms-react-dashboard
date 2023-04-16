import {
  Stack,
  Divider,
  TextInput,
  Flex,
  Loader,
  Text,
  Select,
  createStyles,
  Group,
  Radio,
} from '@mantine/core';
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
  coursePrice,
  setCoursePrice,
  courseDiscount,
  setCourseDiscount,
  courseStars,
  setCourseStars,
  courseComments,
  setCourseComments,
  submitFilterWrapper,
  clear,
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
          maxDropdownHeight={250}
          className={classes.inputStyles}
          label="Instructor"
          placeholder="all"
          data={transformData()}
          value={instructorId}
          onChange={setInstructorId}
          filter={(value, item) => item.label.toLowerCase().includes(value.toLowerCase().trim())}
        />
      )}
      <Radio.Group value={coursePrice} onChange={setCoursePrice} name="price" label="Courses Price">
        <Radio value="free" label="Free" />
        <Radio value="paid" label="Paid" />
      </Radio.Group>
      <Select
        maxDropdownHeight={250}
        className={classes.inputStyles}
        label="Discount"
        data={[
          { value: 'with', label: 'Courses with discount' },
          { value: 'without', label: 'Courses without discount' },
          { value: '10', label: 'More than 10% discount' },
          { value: '20', label: 'More than 20% discount' },
          { value: '30', label: 'More than 30% discount' },
          { value: '40', label: 'More than 40% discount' },
          { value: '50', label: 'More than 50% discount' },
          { value: '60', label: 'More than 60% discount' },
          { value: '70', label: 'More than 70% discount' },
          { value: '80', label: 'More than 80% discount' },
          { value: '90', label: 'More than 90% discount' },
          { value: '100', label: '100% discount' },
        ]}
        value={courseDiscount}
        onChange={setCourseDiscount}
        filter={(value, item) => item.label.toLowerCase().includes(value.toLowerCase().trim())}
      />
      <Select
        maxDropdownHeight={250}
        className={classes.inputStyles}
        label="Stars"
        data={[
          { value: 'with', label: 'Courses with stars' },
          { value: 'without', label: 'Courses without stars' },
          { value: '1', label: '1 stars courses' },
          { value: '2', label: '2 stars courses' },
          { value: '3', label: '3 stars courses' },
          { value: '4', label: '4 stars courses' },
          { value: '5', label: '5 stars courses' },
        ]}
        value={courseStars}
        onChange={setCourseStars}
        filter={(value, item) => item.label.toLowerCase().includes(value.toLowerCase().trim())}
      />
      <Select
        maxDropdownHeight={250}
        className={classes.inputStyles}
        label="Comments"
        data={[
          { value: 'with', label: 'Courses with Comments' },
          { value: 'without', label: 'Courses without Comments' },
        ]}
        value={courseComments}
        onChange={setCourseComments}
        filter={(value, item) => item.label.toLowerCase().includes(value.toLowerCase().trim())}
      />
      <Group position="center">
        <Button
          onClick={() => submitFilterWrapper(randomNumber())}
          color="lmsSecondary"
          leftIcon={<ImFilter size={18} />}
          loading={false}
          my={16}
        >
          Filter
        </Button>
        <Button
          onClick={clear}
          color="lmsLayout"
          leftIcon={<IconX size={18} />}
          loading={false}
          my={16}
        >
          Clear
        </Button>
      </Group>
    </Stack>
  );
}

export default AdminCourseFilter;
