import { Box, Text, Group, Indicator, ActionIcon, Tooltip } from '@mantine/core';

import Logo from '@/components/Logo';
import { Burger } from './Burger';
import DropdownMenu from '@/components/DropdownMenu';
import FullScreenToggle from './FullScreenToggle';
import LightDarkSwitcher from './LightDarkSwitcher';
//icons
import { TbGridDots, MdMessage, FaBell } from '@/components/icons';

export function TopBar({ sx, sidebarOpened, setSidebarOpened }) {
  const topBarStyle = (theme) => ({
    background: theme.colors.lmsSkin[0],
    boxShadow: theme.shadows.sm,
    width: '100vw',
    height: '60px',
    padding: '12px 24px',
    position: 'fixed',
    zIndex: '100',
    top: 0,
    left: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: `1px solid ${theme.colors.lmsBorder[3]}`,
  });
  return (
    // <Box component="nav" sx={[topBarStyle, sx]}>
    //   <Logo />

    //   <Text>this is testing</Text>
    // </Box>

    <Box component="nav" sx={[topBarStyle, sx]}>
      <Burger sidebarOpened={sidebarOpened} setSidebarOpened={setSidebarOpened} />
      <Group>
        <Logo />
        <Text>Lms Pro</Text>
      </Group>
      <Group align="center">
        <Tooltip label="Quick Access" color="lmsLayout" withArrow arrowPosition="center">
          <ActionIcon
            variant="outline"
            sx={(theme) => ({ '&:hover': { backgroundColor: theme.colors.lmsLayout[1] } })}
          >
            <TbGridDots size={18} />
          </ActionIcon>
        </Tooltip>

        <Tooltip label="Messenger" color="lmsLayout" withArrow arrowPosition="center">
          <Indicator inline label="21" color="red" disabled size={16}>
            <ActionIcon
              variant="outline"
              sx={(theme) => ({ '&:hover': { backgroundColor: theme.colors.lmsLayout[1] } })}
            >
              <MdMessage size={18} />
            </ActionIcon>
          </Indicator>
        </Tooltip>
        <Tooltip label="Notifications" color="lmsLayout" withArrow arrowPosition="center">
          <Indicator inline label="21" color="red" disabled size={16}>
            <ActionIcon
              variant="outline"
              sx={(theme) => ({ '&:hover': { backgroundColor: theme.colors.lmsLayout[1] } })}
            >
              <FaBell size={18} />
            </ActionIcon>
          </Indicator>
        </Tooltip>
        <FullScreenToggle />
        <LightDarkSwitcher />
        <DropdownMenu />
      </Group>
    </Box>
  );
}

export default TopBar;
