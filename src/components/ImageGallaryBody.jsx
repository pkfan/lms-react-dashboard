import { useEffect, useState, useRef } from 'react';
import {
  Tabs,
  Flex,
  Image as MantineImage,
  TextInput,
  Stack,
  Title,
  Loader,
  Box,
} from '@mantine/core';
import Overlay from '@/components/common/Overlay';
import Button from '@/components/common/Button';
import Pagination from '@/components/common/Pagination';

import inputStyles from '@/styles/inputStyles';
import { useGetImagesQuery } from '@/api/base';
import getImageUrl from '@/helpers/getImageUrl';

import { FiUpload, FiRefreshCw } from 'react-icons/fi';
import { BiError } from 'react-icons/bi';
import { FaImages, FaExternalLinkAlt, FaCloudUploadAlt } from 'react-icons/fa';
import config from '@/config';
import { IMAGE_EXTENSIONS } from '@/constants/imageExtensions';
import resumableUpload from '@/helpers/resumableUpload';

import { useForm, isEmail, hasLength } from '@mantine/form';
import { NotFoundImage } from './images/NotFoundImage';

export function ImageGallaryBody({
  setImageDetail,
  setOpenGallary,
  onAdded,
  onSuccess,
  onError,
  imageUploadRelativeUrl = '/body-image',
  enableExternalLink = false,
}) {
  const elementRef = useRef();
  const [activePage, setPage] = useState(1);
  const {
    isSuccess: isGetImagesSuccess,
    isFetching: isGetImagesFetching,
    isError: isGetImagesError,
    data: imagesData,
    refetch: imagesRefetch,
  } = useGetImagesQuery(activePage);

  useEffect(() => {
    const divElement = elementRef.current;
    console.log('divElement', divElement); // logs <div>I'm an element</div>

    resumableUpload({
      domElement: divElement,
      url: config.baseUrl + imageUploadRelativeUrl,
      maxFiles: 1,
      maxFileSize: config.imageUploadSize,
      fileExtenstions: IMAGE_EXTENSIONS,
      onSuccess,
      onError,
      onAdded,
    });
  }, []);

  useEffect(() => {
    console.log('isGetImagesSuccess : ', isGetImagesSuccess);
    console.log('isGetImagesError : ', isGetImagesError);
    console.log('imagesData : ', imagesData);
  }, [isGetImagesSuccess, isGetImagesError, imagesData]);

  const form = useForm({
    initialValues: {
      externalLink: '',
    },

    validate: {
      externalLink: (value) => {
        let url;
        try {
          url = new URL(value);
        } catch (_) {
          return 'Invalid Image URL';
        }
        const isValid = url.protocol === 'http:' || url.protocol === 'https:';

        if (isValid) {
          return null;
        }
        return 'Invalid Image URL';
      },
    },
  });

  return (
    <>
      <Tabs color="dark" variant="outline" radius="md" defaultValue="gallery" mih={400}>
        <Tabs.List>
          <Tabs.Tab value="gallery" icon={<FaImages size={16} />}>
            Gallery
          </Tabs.Tab>
          <Tabs.Tab value="upload" icon={<FiUpload size={16} />}>
            Upload
          </Tabs.Tab>
          <Tabs.Tab value="external" icon={<FaExternalLinkAlt size={16} />}>
            External Link
          </Tabs.Tab>
          <Box
            onClick={imagesRefetch}
            sx={{ cursor: 'pointer', position: 'absolute', right: '14px', top: '72px' }}
          >
            {isGetImagesFetching && <Loader size="sm" />}
            <FiRefreshCw size={20} />
          </Box>
        </Tabs.List>

        <Tabs.Panel value="gallery" pt="xs">
          {isGetImagesSuccess && (
            <Flex wrap="wrap" gap={8}>
              {imagesData.data.map((image, index) => {
                const imageUrl = getImageUrl(image);
                const detail = { imageUrl, imageId: image.id };

                return (
                  <MantineImage
                    key={index}
                    radius="sm"
                    src={imageUrl}
                    onClick={() => setImageDetail(detail)}
                    width={180}
                    mah={180}
                    sx={{
                      overflow: 'hidden',
                      cursor: 'pointer',
                      transition: 'all 300ms ease-in-out',
                      '&:hover': { transform: 'scale(1.05)' },
                    }}
                  />
                );
              })}
            </Flex>
          )}
          {isGetImagesSuccess && imagesData.data.length <= 0 && (
            <Stack
              justify="center"
              align="center"
              sx={{ padding: 100, position: 'absolute', top: '0px', width: '100%', zIndex: -1 }}
            >
              <NotFoundImage width={450} message="Images not found" />
            </Stack>
          )}
          {isGetImagesError && (
            <Stack
              justify="center"
              align="center"
              sx={(theme) => ({
                color: theme.colors.red[5],
                padding: 30,
                position: 'absolute',
                top: '100px',
                width: '100%',
                zIndex: -1,
              })}
            >
              <BiError size={150} />
              <Title order={4}>Error in loading your images, refresh browser.</Title>
            </Stack>
          )}
          {isGetImagesFetching && (
            <Stack
              justify="center"
              align="center"
              sx={{ padding: 100, position: 'absolute', top: '100px', width: '100%' }}
            >
              <Loader />
            </Stack>
          )}
        </Tabs.Panel>

        <Tabs.Panel
          value="upload"
          pt="xs"
          sx={(theme) => ({ color: theme.colors.blue[5], padding: 30 })}
        >
          <Stack justify="center" align="center" ref={elementRef} sx={{ cursor: 'pointer' }}>
            <FaCloudUploadAlt size={150} />
            <Title order={4}>Choose an image from your computer.</Title>
          </Stack>
        </Tabs.Panel>
        <Tabs.Panel value="external" pt="xs">
          <Stack
            justify="center"
            align="center"
            sx={{ padding: '100px 0px', position: 'relative' }}
          >
            {!enableExternalLink && <Overlay />}
            <form
              onSubmit={form.onSubmit((values) => {
                console.log('form.onSubmit((values', values);
                setImageDetail({ imageUrl: values.externalLink });
                setOpenGallary(false);
              })}
            >
              <Flex align="end" gap={16}>
                <TextInput
                  sx={inputStyles}
                  withAsterisk
                  label="External URL"
                  icon={<FaExternalLinkAlt size={16} style={{ opacity: 0.7 }} />}
                  placeholder="https://example.com/your-image.jpg"
                  {...form.getInputProps('externalLink')}
                />
                <Button type="submit">Add Image</Button>
              </Flex>
            </form>
          </Stack>
        </Tabs.Panel>
      </Tabs>
      {isGetImagesError && (
        <Stack
          justify="center"
          align="center"
          sx={(theme) => ({ color: theme.colors.red[5], padding: 30 })}
        >
          <BiError size={150} />
          <Title order={4}>Error in loading your images, refresh browser.</Title>
        </Stack>
      )}
      {isGetImagesFetching && (
        <Stack
          justify="center"
          align="center"
          sx={{ padding: 100, position: 'absolute', top: '100px', width: '100%' }}
        >
          <Loader />
        </Stack>
      )}
      {isGetImagesSuccess && imagesData.meta.last_page > 1 && (
        <Pagination total={imagesData.meta.last_page} activePage={activePage} setPage={setPage} />
      )}
    </>
  );
}

export default ImageGallaryBody;
