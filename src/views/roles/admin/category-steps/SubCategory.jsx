import { useState, useEffect } from 'react';
import {
  TextInput,
  Stack,
  Paper,
  ActionIcon,
  Flex,
  Title,
  Divider,
  Text,
  Loader,
  Group,
} from '@mantine/core';
import Button from '@/components/common/Button';

import { BiCategory } from 'react-icons/bi';
import { MdLibraryAdd } from 'react-icons/md';
import { RiDeleteBin2Fill } from 'react-icons/ri';

import inputStylesFull from '@/styles/inputStylesFull';
import { useForm, hasLength } from '@mantine/form';

import textareaStyleFull from '@/styles/textareaStyleFull';
import { showNotification } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons';
import {
  useCreateSubCategoryMutation,
  useDeleteSubCategoryMutation,
  useGetSubCategoriesQuery,
} from '../api';

export function SubCategory({ categoryData, setHasSubCategory }) {
  const {
    isSuccess: isGetSubCategoriesSuccess,
    isFetching: isGetSubCategoriesFetching,
    isError: isGetSubCategoriesError,
    data: getSubCategoriesData,
    refetch: getSubCategoriesRefetch,
  } = useGetSubCategoriesQuery({ categoryId: categoryData.id });

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
    deleteSubCategory,
    {
      isLoading: isDeleteSubCategoryLoading,
      isSuccess: isDeleteSubCategorySuccess,
      error: deleteSubCategoryError,
      data: deleteSubCategoryData,
      isError: isDeleteSubCategoryError,
    },
  ] = useDeleteSubCategoryMutation();

  useEffect(() => {
    if (isCreateSubCategorySuccess) {
      console.log('isCreateSubCategorySuccess', createSubCategoryData);
      // setCategoryId(data.id);
      showNotification({
        id: 'createSubCategorySuccess',
        autoClose: 3000,
        title: 'Sub Category Created',
        message: `Sub category has been created.`,
        color: 'teal',
        icon: <IconCheck />,
        loading: false,
      });
      getSubCategoriesRefetch();
    }
    if (isCreateSubCategoryError) {
      console.log('isCreateSubCategoryError', createSubCategoryError);
      // setCategoryId(data.id);
      showNotification({
        id: 'createSubCategoryError',
        autoClose: 6000,
        title: 'Error!!!',
        message: createSubCategoryError.errors,
        color: 'red',
        icon: <IconX />,
        loading: false,
      });
    }
  }, [isCreateSubCategorySuccess, isCreateSubCategoryError, isGetSubCategoriesSuccess]);

  useEffect(() => {
    if (isDeleteSubCategorySuccess) {
      console.log('deleteSubCategoryData', deleteSubCategoryData);
      // setCategoryId(data.id);
      showNotification({
        id: 'deleteSubCategorySuccess',
        autoClose: 3000,
        title: 'Category Updated',
        message: `category has been Updated.`,
        color: 'teal',
        icon: <IconCheck />,
        loading: false,
      });
      getSubCategoriesRefetch();
    }
    if (isDeleteSubCategoryError) {
      console.log('isDeleteSubCategoryError', deleteSubCategoryError);
      // setCategoryId(data.id);
      showNotification({
        id: 'deleteSubCategoryError',
        autoClose: 6000,
        title: 'Error!!!',
        message: deleteSubCategoryError.errors,
        color: 'red',
        icon: <IconX />,
        loading: false,
      });
    }
  }, [isDeleteSubCategorySuccess, isDeleteSubCategoryError]);

  useEffect(() => {
    if (!isGetSubCategoriesFetching) {
      setHasSubCategory(Boolean(getSubCategoriesData.length));
    }
  }, [isGetSubCategoriesSuccess, isGetSubCategoriesFetching]);

  const form = useForm({
    initialValues: {
      name: '',
      description: '',
    },

    validate: {
      name: hasLength({ min: 3 }, 'Too short'),
    },
  });

  const onSubmitHandle = (values) => {
    createSubCategory({ ...values, category_id: categoryData.id });
  };

  const onClickDeleteSubCategory = (subCategoryId) => {
    deleteSubCategory({ subCategoryId });
  };

  return (
    <Paper p="md" withBorder sx={{ borderLeftWidth: 0, borderRadius: 0 }}>
      <Stack
        spacing="lg"
        py={16}
        sx={(theme) => ({
          border: `1px solid ${theme.colors.lmsLayout[4]}`,
          borderRadius: 4,
          margin: 8,
        })}
      >
        <form onSubmit={form.onSubmit(() => onSubmitHandle(form.values))}>
          <Flex w="100%" align="center" justify="center" py={32}>
            <TextInput
              sx={(theme) => ({
                width: '70%',
                '& input': {
                  backgroundColor: theme.colors.lmsLayout[1],
                },
                '& input::placeholder': {
                  color: theme.colors.lmsLayout[4],
                },
              })}
              withAsterisk
              name="name"
              required
              icon={<BiCategory size={16} style={{ opacity: 0.7 }} />}
              placeholder="Sub Category"
              {...form.getInputProps('name')}
            />
            <Button
              type="submit"
              color="lmsLayout"
              loading={isCreateSubCategoryLoading}
              leftIcon={<MdLibraryAdd size={16} />}
            >
              add
            </Button>
          </Flex>
        </form>
        <Divider variant="dashed" />

        <>
          <Group gap={8}>
            <Title order={4} px={8} underline sx={{ alignSelf: 'start' }}>
              Sub Categories ({getSubCategoriesData?.length})
            </Title>
            {(isGetSubCategoriesFetching || isDeleteSubCategoryLoading) && <Loader size="xs" />}
          </Group>

          <Stack spacing="xs" pl={32}>
            {isGetSubCategoriesError && (
              <Group sx={(theme) => ({ color: theme.colors.red[5] })}>
                <IconX size={20} /> <Text>Error to load sub categories</Text>
              </Group>
            )}
            {isGetSubCategoriesSuccess &&
              getSubCategoriesData.map((subCategory, index) => (
                <Flex key={subCategory.id} gap={8}>
                  <Text>{index + 1}) </Text>
                  <Text> {subCategory.name}</Text>
                  <ActionIcon
                    color="red"
                    variant="transparent"
                    onClick={() => onClickDeleteSubCategory(subCategory.id)}
                  >
                    <RiDeleteBin2Fill size={18} />
                  </ActionIcon>
                </Flex>
              ))}

            {/* <Flex pl={32}>
              <Text>sub category 1</Text>
              <ActionIcon
                color="red"
                variant="transparent"
                onClick={() => form.removeListItem('data', index)}
              >
                <RiDeleteBin2Fill size={18} />
              </ActionIcon>
            </Flex>
            <Flex pl={32}>
              <Text>sub category 1</Text>
              <ActionIcon
                color="red"
                variant="transparent"
                onClick={() => form.removeListItem('data', index)}
              >
                <RiDeleteBin2Fill size={18} />
              </ActionIcon>
            </Flex> */}
          </Stack>
        </>
      </Stack>
    </Paper>
  );
}

export default SubCategory;
