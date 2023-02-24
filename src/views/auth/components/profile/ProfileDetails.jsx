import { useRef, useEffect, useState } from 'react';
import { Text, Avatar, Flex, Title, Anchor, Box, Loader, Group, Skeleton } from '@mantine/core';
import Paper from '@/components/common/Paper';
import resumableUpload from '@/helpers/resumableUpload';
import config from '@/config';
import { showNotification, hideNotification } from '@mantine/notifications';
import { useGetUserAvatarQuery, useGetAuthUserQuery } from '@/views/auth/api';
import createImageUrl from '@/helpers/createImageUrl';

import { IconX, IconCheck } from '@tabler/icons';
import { ImCross, ImCheckmark } from 'react-icons/im';
import UserSystemDetailTabel from './UserSystemDetailTabel';

export function ProfileDetails() {
  const {
    isSuccess: isUserAvatarSuccess,
    isFetching: isUserAvatarFetching,
    data: userAvatarData,
    refetch: userAvatarRefetch,
  } = useGetUserAvatarQuery();

  const { data: authUserData, isSuccess: isAuthUserSuccess } = useGetAuthUserQuery();

  const elementRef = useRef();
  const [avatarSrc, setAvatarSrc] = useState('');
  const [profilePictureDefault, setProfilePictureDefault] = useState(true);
  const [profilePictureAdded, setProfilePictureAdded] = useState({ file: null });
  const [profilePictureSuccess, setProfilePictureSuccess] = useState({ response: null });
  const [profilePictureError, setProfilePictureError] = useState({ response: null });

  const isChanging = () => {
    return (
      !profilePictureDefault &&
      profilePictureAdded.file &&
      !profilePictureError.response &&
      !profilePictureSuccess.response
    );
  };

  const isSuccess = () => {
    return !profilePictureDefault && profilePictureSuccess.response;
  };

  const isError = () => {
    return !profilePictureDefault && profilePictureError.response;
  };

  useEffect(() => {
    const divElement = elementRef.current;
    console.log('divElement', divElement); // logs <div>I'm an element</div>

    resumableUpload({
      domElement: divElement,
      url: config.baseUrl + '/avatar',
      maxFiles: 1,
      maxFileSize: '100-MB',
      fileExtenstions: ['jpg', 'jpeg', 'png', 'webp', 'mp4'],
      onSuccess: setProfilePictureSuccess,
      onError: setProfilePictureError,
      onAdded: setProfilePictureAdded,
    });
  }, []);

  const changePictureDefault = () => {
    // setProfilePictureDefault(false);
    setTimeout(() => {
      setProfilePictureDefault(true);
      setProfilePictureAdded({ file: null });
      setProfilePictureSuccess({ response: null });
      setProfilePictureError({ response: null });
    }, 3000);
  };

  useEffect(() => {
    if (!profilePictureDefault) {
      changePictureDefault();
    }

    if (profilePictureSuccess.response) {
      showNotification({
        id: 'profilePicture',
        autoClose: 4000,
        title: 'Changed',
        message: 'Profile picture updated successfully.',
        color: 'teal',
        icon: <IconCheck />,
        loading: false,
      });
      // const url = `${config.domainUrl}/${profilePictureSuccess.response.directory}/${profilePictureSuccess.response.file_name}.webp`;
      // console.log('url :', url);
      // setAvatarSrc(url);
      console.log('profilePictureSuccess', profilePictureSuccess);
      userAvatarRefetch();
    }

    if (profilePictureError.response) {
      console.log('profilePictureError.response.message : ', profilePictureError.response);
      showNotification({
        id: 'profilePicture',
        autoClose: 30000,
        title: 'Failed',
        message: profilePictureError.response.message,
        color: 'red',
        icon: <IconX />,
        loading: false,
      });
    }
  }, [profilePictureSuccess, profilePictureError]);

  useEffect(() => {
    if (isUserAvatarSuccess && userAvatarData) {
      console.log('userAvatarData : ', userAvatarData);
      const url = createImageUrl({
        directory: userAvatarData.directory,
        imageName: userAvatarData.file_name,
        imageExtension: userAvatarData.extension,
      });

      setAvatarSrc(url);
    }
  }, [isUserAvatarSuccess, userAvatarData]);

  return (
    <Paper sx={{ position: 'sticky', top: 80, left: 0 }}>
      <Flex align="center" direction="column" justify="center" gap={10}>
        <Box>
          {/* {isUserAvatarSuccess && (
            <Avatar
              src={avatarSrc}
              alt="it's me"
              sx={(theme) => ({
                cursor: 'pointer',
                width: '110px',
                height: '110px',
                border: `3px solid ${theme.colors.lmsPrimary[4]}`,
                borderRadius: '50%',
                transition: 'all 300ms ease-in-out',
                '&:hover': { transform: 'scale(1.1)' },
              })}
            />
          )} */}
          {isUserAvatarFetching ? (
            <Skeleton height={110} circle />
          ) : (
            <Avatar
              src={avatarSrc}
              alt="it's me"
              sx={(theme) => ({
                cursor: 'pointer',
                width: '110px',
                height: '110px',
                border: `3px solid ${theme.colors.lmsPrimary[4]}`,
                backgroundColor: theme.colors.lmsLayout[2],

                borderRadius: '50%',
                transition: 'all 300ms ease-in-out',
                '&:hover': { transform: 'scale(1.1)' },
              })}
            />
          )}

          <Anchor
            ref={elementRef}
            href="#"
            onClick={() => {
              setProfilePictureDefault(false);
              hideNotification('profilePicture');
            }}
            sx={{ fontSize: 14, fontWeight: 'bold' }}
          >
            Change Picture
          </Anchor>

          {isChanging() && (
            <Group>
              <Anchor href="#" sx={{ fontSize: 14, fontWeight: 'bold' }}>
                Changing
              </Anchor>
              <Loader size="sm" />
            </Group>
          )}

          {isError() && (
            <Group>
              <Text color="red" sx={{ fontSize: 14, fontWeight: 'bold' }}>
                Error in uploading
              </Text>
              <ImCross size={16} style={{ color: 'red' }} />
              {/* {changePictureDefault()} */}
            </Group>
          )}
          {isSuccess() && (
            <Group>
              <Text color="green" sx={{ fontSize: 14, fontWeight: 'bold' }}>
                changed
              </Text>
              <ImCheckmark size={16} style={{ color: 'green' }} />
              {/* {changePictureDefault()} */}
            </Group>
          )}
        </Box>
        {isAuthUserSuccess && <Title order={3}>{authUserData?.full_name}</Title>}

        <UserSystemDetailTabel />
      </Flex>
    </Paper>
  );
}

export default ProfileDetails;
