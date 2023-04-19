import { useState, useEffect } from 'react';
import { Menu, Avatar, Text } from '@mantine/core';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getImageUrl } from '@/helpers';
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
} from '@/components/icons';

export function DropdownMenu() {
  const [avatarSrc, setAvatarSrc] = useState('');

  const authUser = useSelector((state) => state.authSlice.auth.user);

  useEffect(() => {
    if (authUser?.avatar) {
      const url = getImageUrl(authUser?.avatar);
      setAvatarSrc(url);
    }
  }, [authUser]);

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
        <Menu.Label>Dashboard</Menu.Label>
        <Menu.Item
          component={Link}
          to="/dashboard/student/index"
          icon={<AiOutlineDashboard size={18} />}
        >
          Switch to Student
        </Menu.Item>
        <Menu.Item
          component={Link}
          to="/dashboard/instructor/index"
          icon={<AiOutlineDashboard size={18} />}
        >
          Switch to Instructor
        </Menu.Item>
        <Menu.Item
          component={Link}
          to="/dashboard/admin/index"
          icon={<AiOutlineDashboard size={18} />}
        >
          Switch to Admin
        </Menu.Item>
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
