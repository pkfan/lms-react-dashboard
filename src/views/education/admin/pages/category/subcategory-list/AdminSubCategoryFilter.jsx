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
import { useGetCategoriesQuery } from '@/views/education/admin/api';
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

export function AdminSubCategoryFilter({
  subCategoryName,
  setSubCategoryName,
  categoryId,
  setCategoryId,
  subCategoryCreated,
  setSubCategoryCreated,
  subCategoryUpdated,
  setSubCategoryUpdated,
  subCategorySortField,
  setSubCategorySortField,
  subCategorySortSymbol,
  setSubCategorySortSymbol,
  submitFilterWrapper,
  clear,
}) {
  const { classes } = useStyles();

  const generateUrlQuery = () => {
    const query = new Query();
    const urlQuery = query
      .for('admin/categories') // the model you're selecting
      .sort('name')
      .get();
    // console.log('Query urlQuery::::: ', urlQuery);
    // alert('app loaded');
    return urlQuery;
  };
  const {
    isSuccess: isGetCategoriesSuccess,
    isFetching: isGetCategoriesFetching,
    isError: isGetCategoriesError,
    data: categoriesData,
  } = useGetCategoriesQuery({ url: generateUrlQuery() });

  const transformData = () => {
    // const item = { value: 'rick', label: 'Rick' };

    const data = categoriesData.data.map((category) => ({
      value: category.id,
      label: category.name,
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
        label="Sub Category"
        name="title"
        placeholder="type words"
        value={subCategoryName}
        onChange={(event) => setSubCategoryName(event.currentTarget.value)}
      />
      {isGetCategoriesFetching && (
        <Flex align="center" justify="center">
          <Loader size="sm" />
        </Flex>
      )}
      {isGetCategoriesError && (
        <Flex align="center" justify="center" sx={(theme) => ({ color: theme.colors.red[5] })}>
          <IconX size={16} />
          <Text>Error to load, Please refresh browser.</Text>
        </Flex>
      )}
      {isGetCategoriesSuccess && (
        <Select
          searchable
          nothingFound="No Found"
          maxDropdownHeight={250}
          className={classes.inputStyles}
          label="Select Category"
          placeholder="all"
          data={transformData()}
          value={categoryId}
          onChange={setCategoryId}
          filter={(value, item) => item.label.toLowerCase().includes(value.toLowerCase().trim())}
        />
      )}

      <Select
        maxDropdownHeight={250}
        className={classes.inputStyles}
        label="Created Date"
        data={datesDistanceData}
        value={subCategoryCreated}
        onChange={setSubCategoryCreated}
        filter={(value, item) => item.label.toLowerCase().includes(value.toLowerCase().trim())}
      />
      <Select
        maxDropdownHeight={250}
        className={classes.inputStyles}
        label="Updated Date"
        data={datesDistanceData}
        value={subCategoryUpdated}
        onChange={setSubCategoryUpdated}
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
          value={subCategorySortField}
          onChange={setSubCategorySortField}
          filter={(value, item) => item.label.toLowerCase().includes(value.toLowerCase().trim())}
        />
        <Select
          maxDropdownHeight={250}
          className={classes.inputStyles}
          data={[
            { value: '-', label: 'Descendant' },
            { value: '+', label: 'Ascendant' },
          ]}
          value={subCategorySortSymbol}
          onChange={setSubCategorySortSymbol}
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

export default AdminSubCategoryFilter;
