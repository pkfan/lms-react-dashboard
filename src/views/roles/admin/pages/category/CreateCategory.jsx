import { useState, useEffect } from 'react';
import { Stack, Tabs, Text, Paper, Group, Box, Menu, Button as MantineButton } from '@mantine/core';
import Button from '@/components/common/Button';
import { Link } from 'react-router-dom';
// import MainLoadingOverlay from '@/components/common/MainLoadingOverlay';
import TabStatusIcons from '@/components/common/TabStatusIcons';

import PageTitle from '@/components/common/PageTitle';
import Category from '../../category-steps/Category';
import SubCategory from '../../category-steps/SubCategory';
import { SiAddthis } from 'react-icons/si';
import { FaEdit } from 'react-icons/fa';
import Thumbnail from '../../category-steps/Thumbnail';

export function CreateCategory() {
  const [categoryData, setCategoryData] = useState(null);
  const [hasSubCategory, setHasSubCategory] = useState(false);
  const [hasThumbnail, setHasThumbnail] = useState(false);
  const [disabledOverlay, setDisabledOverlay] = useState(true);

  useEffect(() => {
    if (categoryData) {
      setDisabledOverlay(false);
    }
  }, [categoryData]);

  return (
    <Stack sx={{ width: '100%' }}>
      {/* <MainLoadingOverlay visibleOvarlay={visibleOvarlay} /> */}

      <PageTitle title="Add New Category">
        <Group>
          {categoryData && (
            <Button
              compact
              color="lmsSecondary"
              component={Link}
              to={`/dashboard/admin/category/${categoryData.id}/update`}
              leftIcon={<FaEdit size={16} />}
            >
              Edit This
            </Button>
          )}
          {categoryData && (
            <Button
              compact
              leftIcon={<SiAddthis size={16} />}
              onClick={() => {
                setCategoryData(null);
                setHasSubCategory(false);
                setHasThumbnail(false);
                setDisabledOverlay(true);
              }}
            >
              Add More
            </Button>
          )}
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
            disabled={categoryData}
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
          <Category
            enabled={disabledOverlay}
            categoryData={categoryData}
            setCategoryData={setCategoryData}
          />
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

export default CreateCategory;
