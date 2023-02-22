import { useState, useEffect } from 'react';
import { Avatar, Box, createStyles, Flex, Text } from '@mantine/core';
import { Link } from 'react-router-dom';
import { IconChevronRight } from '@tabler/icons';
import { useGetAuthUserQuery } from '@/views/auth/api';
import { useGetUserAvatarQuery } from '@/views/auth/api';
import createImageUrl from '@/helpers/createImageUrl';

const useStyles = createStyles((theme) => ({
  footer: {
    position: 'absolute',
    left: 0,
    bottom: '60px',
    width: '100%',
    padding: '8px',
    borderTop: `1px solid ${theme.colors.lmsBorder[3]}`,
    backgroundColor: theme.colors.lmsPrimary[2],
    color: `${theme.colors.lmsPrimary[9]}`,

    '&:hover': {
      backgroundColor: theme.colors.lmsPrimary[3],
    },
  },
  avatar: {
    border: `1px solid ${theme.colors.lmsLayout[4]}`,
  },
}));

export function SideBarFooter({ lmsRole }) {
  const { classes } = useStyles();
  const { data: authUserData, isSuccess: isAuthUserSuccess } = useGetAuthUserQuery();
  const { isSuccess: isUserAvatarSuccess, data: userAvatarData } = useGetUserAvatarQuery();
  const [avatarSrc, setAvatarSrc] = useState('');

  useEffect(() => {
    if (isUserAvatarSuccess && userAvatarData) {
      const url = createImageUrl({
        directory: userAvatarData.directory,
        imageName: userAvatarData.file_name,
      });
      setAvatarSrc(url);
    }
  }, [isUserAvatarSuccess, userAvatarData]);

  return (
    <>
      {isAuthUserSuccess && lmsRole != 'profile' && (
        <Box component={Link} to="/dashboard/profile" className={classes.footer}>
          <Flex justify="space-between" align="center">
            <Avatar
              className={classes.avatar}
              radius="sm"
              src={avatarSrc}
              sx={{ backgroundColor: '#000' }}
            />
            <Box>
              <Text fw={700} fz="sm" sx={{ textTransform: 'capitalize' }}>
                {authUserData?.full_name}
              </Text>
              <Text fz="xs" sx={{ textTransform: 'uppercase' }}>
                {lmsRole}
              </Text>
            </Box>
            <IconChevronRight size={18} className="htmlRtlIcon" />
          </Flex>
        </Box>
      )}
    </>
  );
}

export default SideBarFooter;
