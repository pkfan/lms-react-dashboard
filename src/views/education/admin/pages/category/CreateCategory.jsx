import { useState, useEffect } from 'react';
import { Stack, Tabs, Group } from '@mantine/core';
import { Link } from 'react-router-dom';
import { Button, TabStatusIcons, PageTitle } from '@/components';
import { FaEdit, SiAddthis } from '@/components/icons';
import { Category, Thumbnail } from '@/views/education/admin/components';

export function CreateCategory() {
  const [categoryData, setCategoryData] = useState(null);
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
              to={`/dashboard/admin/categories/${categoryData.id}/edit`}
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
            value="thumbnail"
            icon={
              hasThumbnail ? <TabStatusIcons status="check" /> : <TabStatusIcons status="cross" />
            }
          >
            Thumbnail
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="category" pl="xs">
          <Category
            enabled={disabledOverlay}
            categoryData={categoryData}
            setCategoryData={setCategoryData}
          />
        </Tabs.Panel>
        <Tabs.Panel value="thumbnail" pl="xs">
          {categoryData && <Thumbnail category={categoryData} setHasThumbnail={setHasThumbnail} />}
        </Tabs.Panel>
      </Tabs>
    </Stack>
  );
}

export default CreateCategory;
