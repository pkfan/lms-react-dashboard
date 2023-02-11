import { Menu, Avatar, Text } from '@mantine/core';
import { Link } from 'react-router-dom';
import {
  IconSettings,
  IconSearch,
  IconPhoto,
  IconMessageCircle,
  IconTrash,
  IconArrowsLeftRight,
} from '@tabler/icons';
import { GrUser } from 'react-icons/gr';

export function DropdownMenu() {
  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Avatar
          src="https://avatars.githubusercontent.com/u/10353856?v=4"
          alt="it's me"
          sx={(theme) => ({
            cursor: 'pointer',
            border: `2px solid ${theme.colors.lmsLayout[3]}`,
            borderRadius: '50%',
            transition: 'all 300ms ease-in-out',
            '&:hover': { transform: 'scale(1.1)' },
          })}
        />
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Application</Menu.Label>
        <Menu.Item component={Link} to="/dashboard/profile" icon={<GrUser size={18} />}>
          Profile
        </Menu.Item>
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
