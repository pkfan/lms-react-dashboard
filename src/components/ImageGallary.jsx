import { useState, useEffect } from 'react';
import { Modal } from '@mantine/core';
import ImageGallaryBody from './ImageGallaryBody';
import {
  showLoadingNotification,
  updateLoadingNotificationError,
  updateLoadingNotificationSuccess,
} from '@/helpers/notification';
import createImageUrl from '@/helpers/createImageUrl';

export function ImageGallary({
  openGallary,
  setOpenGallary,
  setImageDeta,
  imageUploadRelativeUrl,
}) {
  const [pictureAdded, setPictureAdded] = useState({ file: null });
  const [pictureSuccess, setPictureSuccess] = useState({ response: null });
  const [pictureError, setPictureError] = useState({ response: null });

  const setImageDetail = (imageUrl) => {
    console.log(imageUrl);
    setImageDeta(imageUrl);
    setOpenGallary(false);
  };

  useEffect(() => {
    if (pictureAdded.file && !(pictureSuccess.response || pictureError.response)) {
      console.log(' if (pictureAdded.file && !(pictureSuccess.response || bodyP');
      showLoadingNotification({
        id: 'picture',
        title: 'Uploading Image...',
        message: 'Uloading image to server and then will add.',
      });
    } else if (pictureSuccess.response) {
      const image = pictureSuccess.response;
      const { directory, file_name, extension } = image;

      const imageUrl = createImageUrl({
        directory,
        imageName: file_name,
        imageExtension: extension,
      });
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
          />
        </Modal>
      )}
    </>
  );
}

export default ImageGallary;
