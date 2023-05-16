import _ from 'lodash';
import { useState, useEffect } from 'react';
import { Stack, Tabs, Group, Flex, Loader } from '@mantine/core';
import { Link, useParams } from 'react-router-dom';
import { Button, TabStatusIcons, PageTitle } from '@/components';
import { useGetSubCategoryQuery } from '@/views/education/admin/api';
import { showNotification } from '@mantine/notifications';
import { SubCategory } from '@/views/education/admin/components';
import { IconX, SiAddthis } from '@/components/icons';

export function UpdateSubCategory() {
  const subCategoryId = useParams().id;
  console.log('useParams().id', subCategoryId);

  const [subCategoryData, setSubCategoryData] = useState(null);
  const [categoryId, setCategoryId] = useState(null);

  const {
    isSuccess: isGetSubCategorySuccess,
    isFetching: isGetSubCategoryFetching,
    isError: isGetSubCategoryError,
    data: getSubCategoryData,
    error: getSubCategoryError,
  } = useGetSubCategoryQuery(subCategoryId);

  useEffect(() => {
    if (isGetSubCategorySuccess) {
      setSubCategoryData(getSubCategoryData);
      setCategoryId(getSubCategoryData.category_id);
      console.log('getSubCategoryData', getSubCategoryData);
    }
    if (isGetSubCategoryError) {
      const error = _.isObject(getSubCategoryError.errors)
        ? 'data is invalid.'
        : getSubCategoryError.errors;
      showNotification({
        id: 'createCategoryError',
        autoClose: 6000,
        title: 'Error!!!',
        message: error,
        color: 'red',
        icon: <IconX />,
        loading: false,
      });
    }
  }, [isGetSubCategorySuccess, isGetSubCategoryError]);

  return (
    <Stack sx={{ width: '100%' }}>
      {/* <MainLoadingOverlay visibleOvarlay={visibleOvarlay} /> */}

      <PageTitle title="Update Sub Category">
        <Group>
          {subCategoryData && (
            <Button
              compact
              component={Link}
              to="/dashboard/admin/subcategories/create"
              leftIcon={<SiAddthis size={16} />}
            >
              Add New
            </Button>
          )}
          {/* {subCategoryData && (
            <Button
              compact
              leftIcon={<SiAddthis size={16} />}
              onClick={() => {
                setCategoryData(null);
                setHasSubCategory(false);
                setHasThumbnail(false);
              }}
            >
              Add New
            </Button>
          )} */}
        </Group>
      </PageTitle>

      {isGetSubCategoryFetching && (
        <Flex align="center" justify="center">
          <Loader size="sm" />
        </Flex>
      )}
      {isGetSubCategorySuccess && subCategoryData && (
        <SubCategory
          enabled={true}
          categoryId={categoryId}
          setCategoryId={setCategoryId}
          subCategoryData={subCategoryData}
          setSubCategoryData={setSubCategoryData}
        />
      )}
    </Stack>
  );
}

export default UpdateSubCategory;
