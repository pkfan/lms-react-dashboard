import _ from 'lodash';
import { useState, useEffect } from 'react';
import { Stack, Tabs, Group, Flex, Loader } from '@mantine/core';
import Button from '@/components/common/Button';
import { Link, useParams } from 'react-router-dom';
// import MainLoadingOverlay from '@/components/common/MainLoadingOverlay';
import TabStatusIcons from '@/components/common/TabStatusIcons';

import PageTitle from '@/components/common/PageTitle';
import Category from '../../category-steps/Category';
import SubCategory from '../../category-steps/SubCategory';
import { SiAddthis } from 'react-icons/si';
import { FaEdit } from 'react-icons/fa';
import Thumbnail from '../../category-steps/Thumbnail';
import { useGetCategoryQuery } from '../../api';
import { showNotification } from '@mantine/notifications';
import { IconX } from '@tabler/icons';

export function UpdateCategory() {
  const [categoryData, setCategoryData] = useState(null);
  const [hasSubCategory, setHasSubCategory] = useState(false);
  const [hasThumbnail, setHasThumbnail] = useState(false);
  const categoryId = useParams().id;
  console.log('useParams().id', categoryId);

  const {
    isSuccess: isGetCategorySuccess,
    isFetching: isGetCategoryFetching,
    isError: isGetCategoryError,
    data: getCategoryData,
    error: getCategoryError,
  } = useGetCategoryQuery(categoryId);

  useEffect(() => {
    if (isGetCategorySuccess) {
      setCategoryData(getCategoryData);
      console.log('getCategoryData', getCategoryData.name);
    }
    if (isGetCategoryError) {
      const error = _.isObject(getCategoryError.errors)
        ? 'data is invalid.'
        : getCategoryError.errors;
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
  }, [isGetCategorySuccess, isGetCategoryError]);

  return (
    <Stack sx={{ width: '100%' }}>
      {/* <MainLoadingOverlay visibleOvarlay={visibleOvarlay} /> */}

      <PageTitle title="Add New Category">
        <Group>
          {categoryData && (
            <Button
              compact
              component={Link}
              to="/dashboard/admin/category/create"
              leftIcon={<SiAddthis size={16} />}
            >
              Add New
            </Button>
          )}
          {/* {categoryData && (
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

      <Tabs
        color="dark"
        variant="outline"
        radius="xs"
        orientation="vertical"
        defaultValue="category"
        sx={(theme) => ({
          '& .mantine-Tabs-tab[data-active]': { backgroundColor: theme.white },
          '& .mantine-Tabs-panel': { paddingLeft: 0, paddingTop: 0 },
          '& .mantine-Paper-root': {
            height: '100%',
          },
        })}
      >
        <Tabs.List>
          <Tabs.Tab
            disabled={false}
            sx={{ fontSize: '16px' }}
            value="category"
            icon={
              categoryData ? <TabStatusIcons status="check" /> : <TabStatusIcons status="cross" />
            }
          >
            Category
          </Tabs.Tab>
          <Tabs.Tab
            disabled={!categoryData}
            sx={{ fontSize: '16px' }}
            value="sub_category"
            icon={
              hasSubCategory ? <TabStatusIcons status="check" /> : <TabStatusIcons status="cross" />
            }
          >
            Sub Category
          </Tabs.Tab>
          <Tabs.Tab
            disabled={!categoryData}
            sx={{ fontSize: '16px' }}
            value="thumnail"
            icon={
              hasThumbnail ? <TabStatusIcons status="check" /> : <TabStatusIcons status="cross" />
            }
          >
            thumnail
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="category" pl="xs">
          {isGetCategoryFetching && (
            <Flex align="center" justify="center">
              <Loader size="sm" />
            </Flex>
          )}
          {isGetCategorySuccess && categoryData && (
            <Category
              enabled={true}
              categoryData={categoryData}
              setCategoryData={setCategoryData}
              name={categoryData.name}
              description={categoryData.description}
            />
          )}
        </Tabs.Panel>
        <Tabs.Panel value="sub_category" pl="xs">
          {categoryData && (
            <SubCategory categoryData={categoryData} setHasSubCategory={setHasSubCategory} />
          )}
        </Tabs.Panel>
        <Tabs.Panel value="thumnail" pl="xs">
          {categoryData && (
            <Thumbnail
              image_id={categoryData.image_id}
              category_id={categoryData.id}
              setHasThumbnail={setHasThumbnail}
            />
          )}
        </Tabs.Panel>
      </Tabs>
    </Stack>
  );
}

export default UpdateCategory;
