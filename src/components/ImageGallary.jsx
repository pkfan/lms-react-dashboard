import { useState, useEffect } from 'react';
import { Modal } from '@mantine/core';
import {
  showLoadingNotification,
  updateLoadingNotificationError,
  updateLoadingNotificationSuccess,
} from '@/helpers/notification';
import { IMAGE_EXTENSIONS } from '@/constants/imageExtensions';
import { createImageUrl, imageUploadOnPaste } from '@/helpers';
import ImageGallaryBody from './ImageGallaryBody';

export function ImageGallary({
  openGallary,
  setOpenGallary,
  setImageDeta,
  imageUploadRelativeUrl,
  forTextEditor = false,
  enableExternalLink = false,
}) {
  const [pictureAdded, setPictureAdded] = useState({ file: null });
  const [pictureSuccess, setPictureSuccess] = useState({ response: null });
  const [pictureError, setPictureError] = useState({ response: null });

  const setImageDetail = (image) => {
    console.log(image);
    setImageDeta(image);
    setOpenGallary(false);
  };

  useEffect(() => {
    if (forTextEditor) {
      imageUploadOnPaste({
        onAdded: setPictureAdded,
        onSuccess: setPictureSuccess,
        onError: setPictureError,
      });
    }
  }, []);

  useEffect(() => {
    if (pictureAdded.file && !(pictureSuccess.response || pictureError.response)) {
      console.log(' if (pictureAdded.file && !(pictureSuccess.response || bodyP');
      showLoadingNotification({
        id: 'picture',
        title: 'Uploading Image...',
        message: 'Uloading image to server and then will add.',
      });
    } else if (pictureSuccess.response?.data) {
      const image = pictureSuccess.response?.data;
      // const { directory, file_name, extension } = image;

      const imageUrl = createImageUrl(image);
      console.log('createImageUrl error trace :', imageUrl);

      setImageDetail({ imageUrl, imageId: image.id });

      updateLoadingNotificationSuccess({
        id: 'picture',
        title: 'Image Uploaded and added.',
        message: 'Your image uploaded successfully',
        time: 2000,
      });
      setPictureSuccess({ response: null });
      setOpenGallary(false);
    } else if (pictureError.response) {
      updateLoadingNotificationError({
        id: 'picture',
        title: 'Failed',
        message: pictureError.response.message,
        time: 4000,
      });
      setPictureError({ response: null });
    }
  }, [pictureSuccess, pictureError, pictureAdded]);

  return (
    <>
      {openGallary && (
        <Modal
          size="calc(100vw - 87px)"
          opened={openGallary}
          onClose={() => setOpenGallary(false)}
          title="Add Images"
        >
          <ImageGallaryBody
            setImageDetail={setImageDetail}
            setOpenGallary={setOpenGallary}
            onAdded={setPictureAdded}
            onSuccess={setPictureSuccess}
            onError={setPictureError}
            imageUploadRelativeUrl={imageUploadRelativeUrl}
            enableExternalLink={enableExternalLink}
            imageExtensions={IMAGE_EXTENSIONS}
          />
        </Modal>
      )}
    </>
  );
}

export default ImageGallary;
