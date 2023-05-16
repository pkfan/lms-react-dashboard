import _ from 'lodash';
import { useEffect, useState } from 'react';
import { TextInput, Stack, Paper, Select, Flex, Loader } from '@mantine/core';
import { useForm, hasLength } from '@mantine/form';
import { Button, Overlay } from '@/components';
import { inputStylesFull, textareaStyleFull } from '@/styles';
import {
  useCreateSubCategoryMutation,
  useUpdateSubCategoryMutation,
  useGetCategoriesQuery,
} from '@/views/education/admin/api';
import { showNotification } from '@mantine/notifications';
import { IconCheck, IconX, BiCategory, MdLibraryAdd } from '@/components/icons';
import { Query } from '@/lib/cogent-js';

export function SubCategory({
  subCategoryData,
  setSubCategoryData,
  categoryId,
  setCategoryId,
  enabled = false,
}) {
  const [isSubmit, setIsSubmit] = useState(false);

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
  //////////
  const form = useForm({
    initialValues: {
      name: subCategoryData?.name || '',
    },

    validate: {
      name: hasLength({ min: 3 }, 'Too short'),
    },
  });

  const [
    createSubCategory,
    {
      isLoading: isCreateSubCategoryLoading,
      isSuccess: isCreateSubCategorySuccess,
      error: createSubCategoryError,
      data: createSubCategoryData,
      isError: isCreateSubCategoryError,
    },
  ] = useCreateSubCategoryMutation();

  const [
    updateSubCategory,
    {
      isLoading: isUpdateSubCategoryLoading,
      isSuccess: isUpdateSubCategorySuccess,
      error: updateSubCategoryError,
      data: updateSubCategoryData,
      isError: isUpdateSubCategoryError,
    },
  ] = useUpdateSubCategoryMutation();

  useEffect(() => {
    if (isCreateSubCategorySuccess) {
      console.log('isCreateSubCategorySuccess', createSubCategoryData);
      // setSubCategoryData(data.id);
      showNotification({
        id: 'createSubCategorySuccess',
        autoClose: 3000,
        title: 'Sub Category Created',
        message: `Sub category has been created.`,
        color: 'teal',
        icon: <IconCheck />,
        loading: false,
      });
      setSubCategoryData(createSubCategoryData);
      form.setFieldValue('name', '');
    }
    if (isCreateSubCategoryError) {
      let error;

      if (_.isObject(createSubCategoryError.errors) && createSubCategoryError.errors.name) {
        form.setFieldError('name', createSubCategoryError.errors.name);
        error = 'Input data is invalid.';
      } else if (_.isObject(createSubCategoryError.errors)) {
        error = 'Input data is invalid.';
      } else {
        error = createSubCategoryError.errors;
      }

      showNotification({
        id: 'createSubCategoryError',
        autoClose: 12000,
        title: 'Error!!!',
        message: error,
        color: 'red',
        icon: <IconX />,
        loading: false,
      });
    }
  }, [isCreateSubCategorySuccess, isCreateSubCategoryError]);
  useEffect(() => {
    if (isUpdateSubCategorySuccess) {
      console.log('updateSubCategoryData', updateSubCategoryData);
      // setSubCategoryData(data.id);
      showNotification({
        id: 'updateSubCategorySuccess',
        autoClose: 3000,
        title: 'Sub Category Updated',
        message: `Sub category has been Updated.`,
        color: 'teal',
        icon: <IconCheck />,
        loading: false,
      });
    }
    if (isUpdateSubCategoryError) {
      const error = _.isObject(updateSubCategoryError.errors)
        ? 'Input data is invalid.'
        : updateSubCategoryError.errors;
      showNotification({
        id: 'updateSubCategoryError',
        autoClose: 6000,
        title: 'Error!!!',
        message: error,
        color: 'red',
        icon: <IconX />,
        loading: false,
      });
    }
  }, [isUpdateSubCategorySuccess, isUpdateSubCategoryError]);

  const onSubmitHandle = (values) => {
    if (!subCategoryData) {
      if (categoryId) {
        createSubCategory({ ...values, category_id: categoryId });
      }
    } else {
      updateSubCategory({
        ...values,
        subcategory_id: subCategoryData.id,
        category_id: categoryId,
      });
    }
  };

  return (
    <form
      onSubmit={form.onSubmit(() => {
        setIsSubmit(true);
        onSubmitHandle(form.values);
      })}
    >
      <Paper p="md" withBorder sx={{ borderLeftWidth: 0, borderRadius: 0 }}>
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
              required
              nothingFound="No Found"
              maxDropdownHeight={250}
              sx={inputStylesFull}
              label="Select Category"
              placeholder="all"
              data={transformData()}
              value={categoryId}
              onChange={setCategoryId}
              filter={(value, item) =>
                item.label.toLowerCase().includes(value.toLowerCase().trim())
              }
              error={!categoryId && isSubmit ? 'Category Field Required' : null}
            />
          )}
          <TextInput
            sx={inputStylesFull}
            withAsterisk
            label="Sub Category Name"
            name="name"
            required
            icon={<BiCategory size={16} style={{ opacity: 0.7 }} />}
            placeholder="Mobile Development"
            {...form.getInputProps('name')}
          />

          <Flex w="100%" align="center" justify="center" py={32}>
            <Button
              type="submit"
              color="lmsLayout"
              loading={isCreateSubCategoryLoading || isUpdateSubCategoryLoading}
              leftIcon={<MdLibraryAdd size={16} />}
            >
              {!subCategoryData ? 'Create' : 'Update'}
            </Button>
          </Flex>
        </Stack>
      </Paper>
    </form>
  );
}

export default SubCategory;
