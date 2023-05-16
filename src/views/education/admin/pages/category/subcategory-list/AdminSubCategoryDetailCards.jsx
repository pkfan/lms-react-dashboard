import { Grid, Flex, Loader, Text } from '@mantine/core';
import { useGetSubCategoryCountQuery } from '@/views/education/admin/api';
import { DetailCardCount } from '@/components';
import { IconX, BiCategory } from '@/components/icons';

export function AdminSubCategoryDetailCards({ submitViaCard }) {
  const {
    isSuccess: isGetSubCategoryCountSuccess,
    isFetching: isGetSubCategoryCountFetching,
    isError: isGetSubCategoryCountError,
    data: subCategoriesCountData,
    // refetch: getCategoriesRefetch,
  } = useGetSubCategoryCountQuery();

  return (
    <>
      {isGetSubCategoryCountFetching && (
        <Flex align="center" justify="center">
          <Loader size="sm" />
        </Flex>
      )}
      {isGetSubCategoryCountError && (
        <Flex align="center" justify="center" sx={(theme) => ({ color: theme.colors.red[5] })}>
          <IconX size={16} />
          <Text>Error to load, Please refresh browser.</Text>
        </Flex>
      )}
      {isGetSubCategoryCountSuccess && (
        <Grid my={8}>
          <DetailCardCount
            md={6}
            lg={3}
            title="Total Sub Categories"
            count={subCategoriesCountData.subcategory_count.total}
            icon={<BiCategory size={48} />}
            color="lmsPrimary"
            onClick={() => submitViaCard('total')}
          />
        </Grid>
      )}
    </>
  );
}

export default AdminSubCategoryDetailCards;
