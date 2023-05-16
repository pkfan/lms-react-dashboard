import { useState, useEffect } from 'react';
import { Menu, Avatar, Text } from '@mantine/core';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getImageUrl, getDefaultAvatarUrl } from '@/helpers';
import { useLogoutMutation, useGetUserAvatarQuery } from '@/views/auth/api';

import { useNavigate } from 'react-router-dom';

import { setIsPasswordConfirm as setIsPasswordConfirmAction } from '@/views/auth/slice/authSlice';
import { useDispatch } from 'react-redux';

import {
  showLoadingNotification,
  updateLoadingNotificationError,
  updateLoadingNotificationSuccess,
} from '@/helpers/notification';

//icon
import {
  IconSettings,
  IconSearch,
  IconPhoto,
  IconMessageCircle,
  IconTrash,
  IconArrowsLeftRight,
  BiUser,
  AiOutlineDashboard,
  RiLogoutCircleRLine,
} from '@/components/icons';

import { useRoles, useLmsPaths } from '@/hooks';

export function DropdownMenu() {
  const { hasRole } = useRoles();
  const { wherePathNot } = useLmsPaths();
  const confirmPasswordDispatch = useDispatch();
  const [avatarSrc, setAvatarSrc] = useState('');

  const authUser = useSelector((state) => state.authSlice.auth.user);
  const { isSuccess: isUserAvatarSuccess, data: userAvatarData } = useGetUserAvatarQuery();

  const [logout, { isSuccess: isLogoutSuccess, isError: isLogoutError }] = useLogoutMutation();

  useEffect(() => {
    if (isUserAvatarSuccess && userAvatarData) {
      const url = getImageUrl(userAvatarData);
      setAvatarSrc(url);
    } else {
      setAvatarSrc(getDefaultAvatarUrl());
    }
  }, [isUserAvatarSuccess, userAvatarData]);

  const navigate = useNavigate();
  useEffect(() => {
    if (isLogoutSuccess) {
      confirmPasswordDispatch(setIsPasswordConfirmAction(false));
      updateLoadingNotificationSuccess({
        id: 'logout',
        message: 'Your are logout successfully',
        time: 4000,
      });

      navigate('/lms/login');
    }

    if (isLogoutError) {
      confirmPasswordDispatch(setIsPasswordConfirmAction(false));
      updateLoadingNotificationError({
        id: 'logout',
        message: 'Error to logout from your account',
        time: 3000,
      });
    }
  }, [isLogoutSuccess, isLogoutError]);

  const onLogoutSubmit = () => {
    logout();
    showLoadingNotification({
      id: 'logout',
      title: 'Processing...',
      message: 'Logout from dashboard...',
    });
  };

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Avatar
          src={avatarSrc}
          alt="it's me"
          sx={(theme) => ({
            cursor: 'pointer',
            border: `2px solid ${theme.colors.lmsLayout[5]}`,
            borderRadius: '50%',
            backgroundColor: '#000',
            transition: 'all 300ms ease-in-out',
            '&:hover': { transform: 'scale(1.1)' },
          })}
        />
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item component={Link} to="/dashboard/profile" icon={<BiUser size={18} />}>
          Profile
        </Menu.Item>
        <Menu.Item icon={<RiLogoutCircleRLine size={18} />} onClick={onLogoutSubmit}>
          Logout
        </Menu.Item>
        <Menu.Label>Dashboard</Menu.Label>
        {hasRole('student') && wherePathNot('student') && (
          <Menu.Item
            component={Link}
            to="/dashboard/student/index"
            icon={<AiOutlineDashboard size={18} />}
          >
            Switch to Student
          </Menu.Item>
        )}
        {hasRole('instructor') && wherePathNot('instructor') && (
          <Menu.Item
            component={Link}
            to="/dashboard/instructor/index"
            icon={<AiOutlineDashboard size={18} />}
          >
            Switch to Instructor
          </Menu.Item>
        )}
        {hasRole('super admin') && wherePathNot('super-admin') && (
          <Menu.Item
            component={Link}
            to="/dashboard/super-admin/index"
            icon={<AiOutlineDashboard size={18} />}
          >
            Switch to Super Admin
          </Menu.Item>
        )}
        {hasRole('admin') && wherePathNot('admin') && (
          <Menu.Item
            component={Link}
            to="/dashboard/admin/index"
            icon={<AiOutlineDashboard size={18} />}
          >
            Switch to Admin
          </Menu.Item>
        )}
        {hasRole('accountant') && wherePathNot('accountant') && (
          <Menu.Item
            component={Link}
            to="/dashboard/admin/index"
            icon={<AiOutlineDashboard size={18} />}
          >
            Switch to Accountant
          </Menu.Item>
        )}
        {hasRole('manager') && wherePathNot('manager') && (
          <Menu.Item
            component={Link}
            to="/dashboard/admin/index"
            icon={<AiOutlineDashboard size={18} />}
          >
            Switch to Manager
          </Menu.Item>
        )}
        {hasRole('receptionist') && wherePathNot('receptionist') && (
          <Menu.Item
            component={Link}
            to="/dashboard/admin/index"
            icon={<AiOutlineDashboard size={18} />}
          >
            Switch to Receptionist
          </Menu.Item>
        )}
        <Menu.Label>Application</Menu.Label>
        <Menu.Item icon={<IconSettings size={18} />}>Settings</Menu.Item>
        <Menu.Item icon={<IconMessageCircle size={18} />}>Messages</Menu.Item>
        <Menu.Item icon={<IconPhoto size={18} />}>Gallery</Menu.Item>
        <Menu.Item
          icon={<IconSearch size={18} />}
          rightSection={
            <Text size="xs" color="dimmed">
              ⌘K
            </Text>
          }
        >
          Search
        </Menu.Item>

        <Menu.Divider />

        <Menu.Label>Danger zone</Menu.Label>
        <Menu.Item icon={<IconArrowsLeftRight size={18} />}>Transfer my data</Menu.Item>
        <Menu.Item color="red" icon={<IconTrash size={18} />}>
          Delete my account
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

export default DropdownMenu;
