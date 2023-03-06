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
import Button from '@/components/common/Button';
import { FaSave } from 'react-icons/fa';
import ImageGallary from '@/components/ImageGallary';
import { IconX } from '@tabler/icons';
import getImageUrl from '@/helpers/getImageUrl';
import config from '@/config';
import {
  useGetThumbnailQuery,
  useGetCoverQuery,
  useInsertCoverMutation,
  useInsertThumbnailMutation,
} from '../../../api';

export function ThumbnailAndCover({ thumbnail_id, cover_id, course_id, refetchSteps }) {
  const [openThumbnailGallary, setOpenThumbnailGallary] = useState(false);
  const [openCoverGallary, setOpenCoverGallary] = useState(false);
  const [thumbnailData, setThumbnailData] = useState({ imageId: null, imageUrl: null });
  const [coverData, setCoverData] = useState({ imageId: null, imageUrl: null });

  const {
    isSuccess: isGetThumbnailSuccess,
    isFetching: isGetThumbnailFetching,
    isError: isGetThumbnailError,
    data: getThumbnailData,
  } = useGetThumbnailQuery(thumbnail_id);

  const {
    isSuccess: isGetCoverSuccess,
    isFetching: isGetCoverFetching,
    isError: isGetCoverError,
    data: getCoverData,
  } = useGetCoverQuery(cover_id);

  const [
    insertThumbnail,
    {
      isLoading: isInsertThumbnailLoading,
      isSuccess: isInsertThumbnailSuccess,
      error: insertThumbnailError,
      data: insertThumbnailData,
      isError: isInsertThumbnailError,
    },
  ] = useInsertThumbnailMutation();

  const [
    insertCover,
    {
      isLoading: isInsertCoverLoading,
      isSuccess: isInsertCoverSuccess,
      error: insertCoverError,
      data: insertCoverData,
      isError: isInsertCoverError,
    },
  ] = useInsertCoverMutation();

  useEffect(() => {
    if (isInsertThumbnailSuccess) {
      refetchSteps();
    }
  }, [isInsertThumbnailSuccess]);

  useEffect(() => {
    if (isGetThumbnailSuccess) {
      const image = getThumbnailData;
      const imageUrl = getImageUrl(image);
      const imageDetail = { imageUrl, imageId: image.id };
      setThumbnailData(imageDetail);
    }
    if (isGetThumbnailError) {
      setThumbnailData({ imageUrl: `${config.domainUrl}/storage/images/640X360.png` });
    }

    if (isGetCoverSuccess) {
      const image = getCoverData;
      const imageUrl = getImageUrl(image);
      const imageDetail = { imageUrl, imageId: image.id };
      setCoverData(imageDetail);
    }
    if (isGetCoverError) {
      setCoverData({ imageUrl: `${config.domainUrl}/storage/images/1340X400.png` });
    }
  }, [isGetThumbnailSuccess, isGetCoverSuccess, isGetThumbnailError, isGetCoverError]);

  const insertThumbnailDetail = (imageDetail) => {
    console.log('image detail : ', imageDetail);
    insertThumbnail({ image_id: imageDetail.imageId, course_id });
    setThumbnailData(imageDetail);
  };
  const insertCoverDetail = (imageDetail) => {
    console.log('image detail : ', imageDetail);
    insertCover({ image_id: imageDetail.imageId, course_id });
    setCoverData(imageDetail);
  };

  return (
    <Paper p="md" withBorder sx={{ borderLeftWidth: 0, borderRadius: 0 }}>
      <Flex w="100%" align="center" justify="end">
        <Button compact color="lmsLayout" leftIcon={<FaSave size={16} />}>
          save
        </Button>
      </Flex>

      <Stack
        spacing="lg"
        py={16}
        sx={(theme) => ({
          border: `1px solid ${theme.colors.lmsLayout[4]}`,
          margin: 8,
        })}
        justify="center"
        align="center"
      >
        <Title order={4}>Course Thumbnail</Title>
        <Box
          sx={{
            position: 'relative',
            width: '50%',
            borderRadius: 4,
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
          imageUploadRelativeUrl="/instructor/course/thumbnail/upload"
        />

        <Divider my="sm" variant="dashed" w="100%" />

        <Title order={4}>Background Cover</Title>
        <Box
          sx={{
            position: 'relative',
            width: '80%',
            overflow: 'hidden',
            cursor: 'pointer',
          }}
          onClick={() => setOpenCoverGallary(true)}
        >
          {/* <Image src={`${config.domainUrl}/storage/images/1340X400.png`} alt="1340X400 thumbnail" /> */}
          <Image
            sx={(theme) => ({ border: `1px solid ${theme.colors.lmsLayout[3]}` })}
            src={coverData.imageUrl}
            alt="1340X400 thumbnail"
          />
          <Flex align="center" justify="center">
            <Anchor fw={500} to="#">
              Change Cover
            </Anchor>
          </Flex>
          {isInsertCoverLoading && (
            <Flex align="center" justify="center">
              <Loader size="sm" />
            </Flex>
          )}
          {insertCoverError && (
            <Flex align="center" justify="center" sx={(theme) => ({ color: theme.colors.red[5] })}>
              <IconX size={16} />
              <Text>Error updating cover image, Please try later.</Text>
            </Flex>
          )}
        </Box>
        <ImageGallary
          openGallary={openCoverGallary}
          setOpenGallary={setOpenCoverGallary}
          setImageDeta={insertCoverDetail}
          imageUploadRelativeUrl="/instructor/course/cover/upload"
        />
      </Stack>
      <Flex w="100%" align="center" justify="center" py={32}>
        <Button color="lmsLayout" leftIcon={<FaSave size={16} />}>
          save
        </Button>
      </Flex>
    </Paper>
  );
}

export default ThumbnailAndCover;
