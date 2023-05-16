import { useState, useEffect } from 'react';
import { Stack, Tabs, Group } from '@mantine/core';
import { Link } from 'react-router-dom';
import { Button, TabStatusIcons, PageTitle } from '@/components';
import { FaEdit, SiAddthis } from '@/components/icons';
import { SubCategory } from '@/views/education/admin/components';

export function CreateSubCategory() {
  const [subCategoryData, setSubCategoryData] = useState(null);
  const [categoryId, setCategoryId] = useState(null);
  const [disabledOverlay, setDisabledOverlay] = useState(true);

  useEffect(() => {
    if (subCategoryData) {
      setDisabledOverlay(false);
    }
  }, [subCategoryData]);

  return (
    <Stack sx={{ width: '100%' }}>
      {/* <MainLoadingOverlay visibleOvarlay={visibleOvarlay} /> */}

      <PageTitle title="Add New Sub Category">
        <Group>
          {subCategoryData && (
            <Button
              compact
              color="lmsSecondary"
              component={Link}
              to={`/dashboard/admin/subcategories/${subCategoryData.id}/edit`}
              leftIcon={<FaEdit size={16} />}
            >
              Edit This
            </Button>
          )}
          {subCategoryData && (
            <Button
              compact
              leftIcon={<SiAddthis size={16} />}
              onClick={() => {
                setSubCategoryData(null);
                setDisabledOverlay(true);
              }}
            >
              Add More
            </Button>
          )}
        </Group>
      </PageTitle>

      <SubCategory
        enabled={disabledOverlay}
        categoryId={categoryId}
        setCategoryId={setCategoryId}
        subCategoryData={subCategoryData}
        setSubCategoryData={setSubCategoryData}
      />
    </Stack>
  );
}

export default CreateSubCategory;
