import { Grid, Image, Box, Title, Text, Flex, Group, Divider } from '@mantine/core';
import CategoryCardAction from './CategoryCardAction';
import { FaEdit } from 'react-icons/fa';
import { ImEye } from 'react-icons/im';
import { MdOutlineQuiz, MdOutlineAssignment, MdDeleteForever } from 'react-icons/md';
import getImageUrl from '@/helpers/getImageUrl';
import { Link } from 'react-router-dom';
import config from '@/config';

export function CategoryCard({ category }) {
  const imageSrc = category.image
    ? getImageUrl(category.image)
    : `${config.domainUrl}/storage/images/400X400.png`;

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
          <CategoryCardAction tooltip="Delete Category">
            <MdDeleteForever size={24} />
          </CategoryCardAction>
        </Flex>
      </Box>
    </Flex>
  );
}

export default CategoryCard;
