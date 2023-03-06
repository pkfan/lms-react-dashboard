import { useEffect } from 'react';
import { Grid, Image, Box, Title, Text, Flex, Group, Divider } from '@mantine/core';
import CategoryCardAction from './CategoryCardAction';
import { useDisclosure } from '@mantine/hooks';
import { FaEdit } from 'react-icons/fa';
import { ImEye } from 'react-icons/im';
import { MdOutlineQuiz, MdOutlineAssignment, MdDeleteForever } from 'react-icons/md';
import getImageUrl from '@/helpers/getImageUrl';
import { Link } from 'react-router-dom';
import config from '@/config';
import DeleteModal from '@/components/common/modals/DeleteModal';
import { useDeleteCategoryMutation } from '../../api';
import { showNotification } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons';

export function CategoryCard({ category, getCategoriesRefetch }) {
  const [openedModal, { open: openModal, close: closeModal }] = useDisclosure(false);
  const imageSrc = category.image
    ? getImageUrl(category.image)
    : `${config.domainUrl}/storage/images/400X400.png`;

  const [
    deleteCategory,
    {
      isLoading: isDeleteCategoryLoading,
      isSuccess: isDeleteCategorySuccess,
      error: deleteCategoryError,
      data: deleteCategoryData,
      isError: isDeleteCategoryError,
    },
  ] = useDeleteCategoryMutation();

  useEffect(() => {
    if (isDeleteCategorySuccess) {
      showNotification({
        id: 'deleteCategorySuccess',
        autoClose: 3000,
        title: 'Category deleted',
        message: `category has been deleted.`,
        color: 'teal',
        icon: <IconCheck />,
        loading: false,
      });
      getCategoriesRefetch();
      closeModal();
    }
    if (isDeleteCategoryError) {
      // setCategoryId(data.id);
      showNotification({
        id: 'deleteCategoryData',
        autoClose: 6000,
        title: 'Error!!!',
        message: deleteCategoryError.errors,
        color: 'red',
        icon: <IconX />,
        loading: false,
      });
    }
  }, [isDeleteCategorySuccess, isDeleteCategoryError]);

  const confirmDelete = () => {
    deleteCategory(category.id);
  };

  return (
    <Flex
      direction="column"
      gap={8}
      sx={(theme) => ({
        border: `1px solid ${theme.colors.lmsLayout[3]}`,
        backgroundColor: theme.colors.lmsLayout[0],
        borderRadius: 4,
        position: 'relative',
        width: '200px',
      })}
    >
      <Box>
        <Flex justify="center" align="center" w="100%" h="100%">
          <Image radius="md" src={imageSrc} alt="Random unsplash image" />
        </Flex>
      </Box>
      <Title px={8} order={5}>
        {' '}
        {category.name}
      </Title>
      <Divider variant="dashed" />

      <Group px={8}>
        <Text fz={12}>Sub Categories </Text>
        <Text fz={12}>({category.sub_categories_count})</Text>
      </Group>
      <Divider variant="dashed" />
      <Box
        span={12}
        xs={2}
        sx={(theme) => ({
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '8px',
        })}
      >
        <Flex align="center" justify="center" gap={8} wrap="wrap">
          <CategoryCardAction
            component={Link}
            to={`/dashboard/admin/category/${category.id}/update`}
            tooltip="Edit Category"
          >
            <FaEdit size={24} />
          </CategoryCardAction>
          <CategoryCardAction onClick={openModal} tooltip="Delete Category">
            <MdDeleteForever size={24} />
          </CategoryCardAction>
        </Flex>
      </Box>
      <DeleteModal
        title="Delete Category"
        opened={openedModal}
        confirm={confirmDelete}
        close={closeModal}
        isDeleting={isDeleteCategoryLoading}
      >
        <Text>Are you sure you want to delete ({category.name}) category?</Text>
        <br />
        <Text>
          If you delete this category, then all courses of this category will disappear from SEARCH
          results.
        </Text>
        <br />
        <Text>Remember! you can EDIT/UPDATE this category, instead of delete.</Text>
      </DeleteModal>
    </Flex>
  );
}

export default CategoryCard;
