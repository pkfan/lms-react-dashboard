import { Grid, Flex, Loader, Text } from '@mantine/core';
import { useGetCategoryCountQuery } from '@/views/education/admin/api';
import { DetailCardCount } from '@/components';
import { IconX, BiCategory } from '@/components/icons';

export function AdminCategoryDetailCards({ submitViaCard }) {
  const {
    isSuccess: isGetCategoryCountSuccess,
    isFetching: isGetCategoryCountFetching,
    isError: isGetCategoryCountError,
    data: categoriesCountData,
    // refetch: getCategoriesRefetch,
  } = useGetCategoryCountQuery();

  return (
    <>
      {isGetCategoryCountFetching && (
        <Flex align="center" justify="center">
          <Loader size="sm" />
        </Flex>
      )}
      {isGetCategoryCountError && (
        <Flex align="center" justify="center" sx={(theme) => ({ color: theme.colors.red[5] })}>
          <IconX size={16} />
          <Text>Error to load, Please refresh browser.</Text>
        </Flex>
      )}
      {isGetCategoryCountSuccess && (
        <Grid my={8}>
          <DetailCardCount
            md={6}
            lg={3}
            title="Total Categories"
            count={categoriesCountData.category_count.total}
            icon={<BiCategory size={48} />}
            color="lmsPrimary"
            onClick={() => submitViaCard('total')}
          />
        </Grid>
      )}
    </>
  );
}

export default AdminCategoryDetailCards;
