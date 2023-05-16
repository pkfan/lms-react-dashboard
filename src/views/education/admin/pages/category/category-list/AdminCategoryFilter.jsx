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
import { useGetInstructorsQuery } from '@/views/education/admin/api';
import { Query } from '@/lib/cogent-js';
import { Button } from '@/components';

import { IconX, ImFilter } from '@/components/icons';

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

export function AdminCategoryFilter({
  categoryName,
  setCategoryName,
  categoryCreated,
  setCategoryCreated,
  categoryUpdated,
  setCategoryUpdated,
  categorySortField,
  setCategorySortField,
  categorySortSymbol,
  setCategorySortSymbol,
  submitFilterWrapper,
  clear,
}) {
  const { classes } = useStyles();

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
        label="Category"
        name="title"
        placeholder="type words"
        value={categoryName}
        onChange={(event) => setCategoryName(event.currentTarget.value)}
      />

      <Select
        maxDropdownHeight={250}
        className={classes.inputStyles}
        label="Created Date"
        data={datesDistanceData}
        value={categoryCreated}
        onChange={setCategoryCreated}
        filter={(value, item) => item.label.toLowerCase().includes(value.toLowerCase().trim())}
      />
      <Select
        maxDropdownHeight={250}
        className={classes.inputStyles}
        label="Updated Date"
        data={datesDistanceData}
        value={categoryUpdated}
        onChange={setCategoryUpdated}
        filter={(value, item) => item.label.toLowerCase().includes(value.toLowerCase().trim())}
      />
      <Divider variant="dashed" my="xs" label="Sort By" labelPosition="center" />
      <Flex gap={4}>
        <Select
          maxDropdownHeight={250}
          className={classes.inputStyles}
          data={[
            { value: 'name', label: 'Category' },
            { value: 'updated_at', label: 'Updated' },
            { value: 'created_at', label: 'Created' },
          ]}
          value={categorySortField}
          onChange={setCategorySortField}
          filter={(value, item) => item.label.toLowerCase().includes(value.toLowerCase().trim())}
        />
        <Select
          maxDropdownHeight={250}
          className={classes.inputStyles}
          data={[
            { value: '-', label: 'Descendant' },
            { value: '+', label: 'Ascendant' },
          ]}
          value={categorySortSymbol}
          onChange={setCategorySortSymbol}
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

export default AdminCategoryFilter;
