import { useState, useEffect, useRef } from 'react';
import {
  Stack,
  Paper,
  Box,
  Flex,
  Title,
  Text,
  Divider,
  Image,
  Loader,
  Anchor,
} from '@mantine/core';
import { ImageGallary } from '@/components';
import { getImageUrl } from '@/helpers';
import config from '@/config';
import { useGetCategoryThumbnailQuery, useInsertCategoryThumbnailMutation } from '../../../api';
import { IconX } from '@/components/icons';

export function Thumbnail({ image_id = 0, category_id = 0, setHasThumbnail }) {
  const [openThumbnailGallary, setOpenThumbnailGallary] = useState(false);
  const [thumbnailData, setThumbnailData] = useState({ imageId: null, imageUrl: null });

  const {
    isSuccess: isGetThumbnailSuccess,
    isFetching: isGetThumbnailFetching,
    isError: isGetThumbnailError,
    data: getThumbnailData,
  } = useGetCategoryThumbnailQuery(image_id);

  const [
    insertThumbnail,
    {
      isLoading: isInsertThumbnailLoading,
      isSuccess: isInsertThumbnailSuccess,
      error: insertThumbnailError,
      data: insertThumbnailData,
      isError: isInsertThumbnailError,
    },
  ] = useInsertCategoryThumbnailMutation();

  useEffect(() => {
    if (isGetThumbnailSuccess) {
      const image = getThumbnailData;
      const imageUrl = getImageUrl(image);
      const imageDetail = { imageUrl, imageId: image.id };
      setThumbnailData(imageDetail);
      setHasThumbnail(true);
    }
    if (isGetThumbnailError) {
      setThumbnailData({ imageUrl: `${config.domainUrl}/storage/images/400X400.png` });
    }
  }, [isGetThumbnailSuccess, isGetThumbnailError]);

  useEffect(() => {
    if (isInsertThumbnailSuccess) {
      setHasThumbnail(true);
    }
  }, [isInsertThumbnailSuccess]);

  const insertThumbnailDetail = (imageDetail) => {
    console.log('image detail : ', imageDetail);
    insertThumbnail({ image_id: imageDetail.imageId, category_id });
    setThumbnailData(imageDetail);
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
        justify="center"
        align="center"
      >
        <Title order={4}>Category Thumbnail</Title>
        <Box
          sx={{
            position: 'relative',
            width: '35%',
            overflow: 'hidden',
            cursor: 'pointer',
          }}
          onClick={() => setOpenThumbnailGallary(true)}
        >
          {/* <Image src={`${config.domainUrl}/storage/images/640X360.png`} alt="640X360 thumbnail" /> */}
          <Image
            sx={(theme) => ({ border: `1px solid ${theme.colors.lmsLayout[3]}` })}
            src={thumbnailData.imageUrl}
            alt="640X360 thumbnail"
          />
          <Flex align="center" justify="center">
            <Anchor fw={500} to="#">
              Change Thumbnail
            </Anchor>
          </Flex>
          {isInsertThumbnailLoading && (
            <Flex align="center" justify="center">
              <Loader size="sm" />
            </Flex>
          )}
          {insertThumbnailError && (
            <Flex align="center" justify="center" sx={(theme) => ({ color: theme.colors.red[5] })}>
              <IconX size={16} />
              <Text>Error updating Thumbnail image, Please try later.</Text>
            </Flex>
          )}
        </Box>

        <ImageGallary
          openGallary={openThumbnailGallary}
          setOpenGallary={setOpenThumbnailGallary}
          setImageDeta={insertThumbnailDetail}
          imageUploadRelativeUrl="/admin/course/category/thumbnail/upload"
        />
      </Stack>
    </Paper>
  );
}

export default Thumbnail;
