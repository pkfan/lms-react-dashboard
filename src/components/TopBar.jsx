import { Box, Text, Group } from '@mantine/core';

import Logo from '@/components/Logo';

import { Burger } from './Burger';
import DropdownMenu from '@/views/auth/profile/DropdownMenu';

function TopBar({ sx, sidebarOpened, setSidebarOpened }) {
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
      <Box>
        <DropdownMenu />
      </Box>
    </Box>
  );
}

export default TopBar;
