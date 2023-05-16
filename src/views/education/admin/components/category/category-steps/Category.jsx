import _ from 'lodash';
import { useEffect } from 'react';
import { TextInput, Stack, Paper, Textarea, Flex } from '@mantine/core';
import { useForm, hasLength } from '@mantine/form';
import { Button, Overlay } from '@/components';
import { inputStylesFull, textareaStyleFull } from '@/styles';
import { useCreateCategoryMutation, useUpdateCategoryMutation } from '@/views/education/admin/api';
import { showNotification } from '@mantine/notifications';
import { IconCheck, IconX, BiCategory, MdLibraryAdd } from '@/components/icons';

export function Category({ categoryData, setCategoryData, enabled = false }) {
  const form = useForm({
    initialValues: {
      name: categoryData?.name || '',
      description: categoryData?.description || '',
    },

    validate: {
      name: hasLength({ min: 3 }, 'Too short'),
    },
  });

  const [
    createCategory,
    {
      isLoading: isCreateCategoryLoading,
      isSuccess: isCreateCategorySuccess,
      error: createCategoryError,
      data: createCategoryData,
      isError: isCreateCategoryError,
    },
  ] = useCreateCategoryMutation();

  const [
    updateCategory,
    {
      isLoading: isUpdateCategoryLoading,
      isSuccess: isUpdateCategorySuccess,
      error: updateCategoryError,
      data: updateCategoryData,
      isError: isUpdateCategoryError,
    },
  ] = useUpdateCategoryMutation();

  useEffect(() => {
    if (isCreateCategorySuccess) {
      console.log('isCreateCategorySuccess', createCategoryData);
      // setCategoryData(data.id);
      showNotification({
        id: 'createCategorySuccess',
        autoClose: 3000,
        title: 'Category Created',
        message: `category has been created.`,
        color: 'teal',
        icon: <IconCheck />,
        loading: false,
      });
      setCategoryData(createCategoryData);
      form.setFieldValue('name', '');
      form.setFieldValue('description', '');
    }
    if (isCreateCategoryError) {
      let error;

      if (_.isObject(createCategoryError.errors) && createCategoryError.errors.name) {
        form.setFieldError('name', createCategoryError.errors.name);
        error = 'Input data is invalid.';
      } else if (_.isObject(createCategoryError.errors)) {
        error = 'Input data is invalid.';
      } else {
        error = createCategoryError.errors;
      }

      showNotification({
        id: 'createCategoryError',
        autoClose: 12000,
        title: 'Error!!!',
        message: error,
        color: 'red',
        icon: <IconX />,
        loading: false,
      });
    }
  }, [isCreateCategorySuccess, isCreateCategoryError]);
  useEffect(() => {
    if (isUpdateCategorySuccess) {
      console.log('updateCategoryData', updateCategoryData);
      // setCategoryData(data.id);
      showNotification({
        id: 'updateCategorySuccess',
        autoClose: 3000,
        title: 'Category Updated',
        message: `category has been Updated.`,
        color: 'teal',
        icon: <IconCheck />,
        loading: false,
      });
    }
    if (isUpdateCategoryError) {
      const error = _.isObject(updateCategoryError.errors)
        ? 'Input data is invalid.'
        : updateCategoryError.errors;
      showNotification({
        id: 'updateCategoryError',
        autoClose: 6000,
        title: 'Error!!!',
        message: error,
        color: 'red',
        icon: <IconX />,
        loading: false,
      });
    }
  }, [isUpdateCategorySuccess, isUpdateCategoryError]);

  const onSubmitHandle = (values) => {
    if (!categoryData) {
      createCategory(values);
    } else {
      updateCategory({ ...values, category_id: categoryData.id });
    }
  };

  return (
    <form onSubmit={form.onSubmit(() => onSubmitHandle(form.values))}>
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
          <TextInput
            sx={inputStylesFull}
            withAsterisk
            label="Category Name"
            name="name"
            required
            icon={<BiCategory size={16} style={{ opacity: 0.7 }} />}
            placeholder="Mobile Development"
            {...form.getInputProps('name')}
          />

          <Stack w="100%" spacing="xs">
            <Textarea
              sx={textareaStyleFull}
              label="Category Description"
              name="description"
              placeholder="write category description."
              minRows={6}
              {...form.getInputProps('description')}
            />
          </Stack>
          <Flex w="100%" align="center" justify="center" py={32}>
            <Button
              type="submit"
              color="lmsLayout"
              loading={isCreateCategoryLoading || isUpdateCategoryLoading}
              leftIcon={<MdLibraryAdd size={16} />}
            >
              {!categoryData ? 'Create' : 'Update'}
            </Button>
          </Flex>
        </Stack>
      </Paper>
    </form>
  );
}

export default Category;
