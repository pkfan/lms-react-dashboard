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
  courseStatus,
  setCourseStatus,
  courseLiveStatus,
  setCourseLiveStatus,
  courseDiscount,
  setCourseDiscount,
  courseStars,
  setCourseStars,
  courseComments,
  setCourseComments,
  courseAccessDays,
  setCourseAccessDays,
  coursePublished,
  setCoursePublished,
  courseContentUpdated,
  setCourseContentUpdated,
  courseCreated,
  setCourseCreated,
  courseUpdated,
  setCourseUpdated,
  courseSortField,
  setCourseSortField,
  courseSortSymbol,
  setCourseSortSymbol,
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

  const datesDistanceData = [
    { value: '1-hour', label: 'last 1 hour' },
    { value: '3-hour', label: 'last 3 hour' },
    { value: '6-hour', label: 'last 6 hour' },
    { value: '12-hour', label: 'last 12 hour' },
    { value: '1-day', label: 'last 1 day' },
    { value: '3-day', label: 'last 3 days' },
    { value: '7-day', label: 'last 7 days' },
    { value: '15-day', label: 'last 15 days' },
    { value: '1-month', label: 'last 1 month' },
    { value: '2-month', label: 'last 2 months' },
    { value: '3-month', label: 'last 3 months' },
    { value: '6-month', label: 'last 6 months' },
    { value: '1-year', label: 'last 1 years' },
    { value: '2-year', label: 'last 2 years' },
    { value: '3-year', label: 'last 3 years' },
    { value: '4-year', label: 'last 4 years' },
    { value: '5-year', label: 'last 5 years' },
    { value: '6-year', label: 'last 6 years' },
  ];

  return (
    <Stack spacing="xs">
      <TextInput
        className={classes.inputStyles}
        label="Courses"
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
      <Radio.Group value={courseStatus} onChange={setCourseStatus} name="Status" label="Status">
        <Radio value="pending" label="Pending" />
        <Radio value="approved" label="Approved" />
        <Radio value="reject" label="Reject" />
        <Radio value="blocked" label="Blocked" />
      </Radio.Group>
      <Radio.Group
        value={courseLiveStatus}
        onChange={setCourseLiveStatus}
        name="LiveStatus"
        label="Live Status"
      >
        <Radio value="draft" label="Draft" />
        <Radio value="private" label="Private" />
        <Radio value="publish" label="Publish" />
      </Radio.Group>
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
      <Select
        maxDropdownHeight={250}
        className={classes.inputStyles}
        label="Access Days Limit"
        data={[
          { value: 'unlimited', label: 'Courses with unlimited access days' },
          { value: 'limited', label: 'Courses with limited access days' },
          { value: '7-<=', label: 'Courses <= 7 access days' },
          { value: '15-<=', label: 'Courses <= 15 access days' },
          { value: '30-<=', label: 'Courses <= 30 access days' },
          { value: '45-<=', label: 'Courses <= 45 access days' },
          { value: '60-<=', label: 'Courses <= 60 access days' },
          { value: '60->=', label: 'Courses >= 60 access days' },
          { value: '90-<=', label: 'Courses <= 90 access days' },
          { value: '90->=', label: 'Courses >= 90 access days' },
          { value: '180-<=', label: 'Courses <= 6 months' },
          { value: '180->=', label: 'Courses >= 6 months' },
          { value: '365-<=', label: 'Courses <= 1 year' },
          { value: '365->=', label: 'Courses >= 1 year' },
        ]}
        value={courseAccessDays}
        onChange={setCourseAccessDays}
        filter={(value, item) => item.label.toLowerCase().includes(value.toLowerCase().trim())}
      />

      <Divider variant="dashed" my="xs" label="Filter by date" labelPosition="center" />

      <Select
        maxDropdownHeight={250}
        className={classes.inputStyles}
        label="Published Date"
        data={[
          { value: 'published', label: 'Published courses' },
          { value: 'unpublished', label: 'Unpublished courses' },
          ...datesDistanceData,
        ]}
        value={coursePublished}
        onChange={setCoursePublished}
        filter={(value, item) => item.label.toLowerCase().includes(value.toLowerCase().trim())}
      />
      <Select
        maxDropdownHeight={250}
        className={classes.inputStyles}
        label="Content Updated Date"
        data={datesDistanceData}
        value={courseContentUpdated}
        onChange={setCourseContentUpdated}
        filter={(value, item) => item.label.toLowerCase().includes(value.toLowerCase().trim())}
      />
      <Select
        maxDropdownHeight={250}
        className={classes.inputStyles}
        label="Created Date"
        data={datesDistanceData}
        value={courseCreated}
        onChange={setCourseCreated}
        filter={(value, item) => item.label.toLowerCase().includes(value.toLowerCase().trim())}
      />
      <Select
        maxDropdownHeight={250}
        className={classes.inputStyles}
        label="Updated Date"
        data={datesDistanceData}
        value={courseUpdated}
        onChange={setCourseUpdated}
        filter={(value, item) => item.label.toLowerCase().includes(value.toLowerCase().trim())}
      />
      <Divider variant="dashed" my="xs" label="Sort By" labelPosition="center" />
      <Flex gap={4}>
        <Select
          maxDropdownHeight={250}
          className={classes.inputStyles}
          data={[
            { value: 'title', label: 'Title' },
            { value: 'price', label: 'Price' },
            { value: 'discount', label: 'Discount' },
            { value: 'access_days', label: 'Access Days Limit' },
            { value: 'published_at', label: 'Published' },
            { value: 'content_updated_at', label: 'Content Updated' },
            { value: 'updated_at', label: 'Updated' },
            { value: 'created_at', label: 'Created' },
          ]}
          value={courseSortField}
          onChange={setCourseSortField}
          filter={(value, item) => item.label.toLowerCase().includes(value.toLowerCase().trim())}
        />
        <Select
          maxDropdownHeight={250}
          className={classes.inputStyles}
          data={[
            { value: '-', label: 'Descendant' },
            { value: '+', label: 'Ascendant' },
          ]}
          value={courseSortSymbol}
          onChange={setCourseSortSymbol}
          filter={(value, item) => item.label.toLowerCase().includes(value.toLowerCase().trim())}
        />
      </Flex>

      <Group position="center">
        <Button
          onClick={() => submitFilterWrapper()}
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
