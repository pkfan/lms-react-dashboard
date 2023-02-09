import { Box, Text } from '@mantine/core';

import Logo from '@/components/Logo';

import { Burger } from './Burger';

function TopBar({ sx, sidebarOpened, setSidebarOpened }) {
  const topBarStyle = (theme) => ({
    background: theme.colors.lmsSkin[0],
    boxShadow: theme.shadows.sm,
    width: '100vw',
    height: '48px',
    padding: '12px 24px',
    position: 'fixed',
    zIndex: '100',
    top: 0,
    left: 0,
    display: 'flex',
    alignItems: 'center',
    borderBottom: `1px solid ${theme.colors.lmsBorder[3]}`,
  });
  return (
    // <Box component="nav" sx={[topBarStyle, sx]}>
    //   <Logo />

    //   <Text>this is testing</Text>
    // </Box>

    <Box component="nav" sx={[topBarStyle, sx]}>
      <Burger sidebarOpened={sidebarOpened} setSidebarOpened={setSidebarOpened} />
      <Logo />
      <Text>Application Box</Text>
    </Box>
  );
}

export default TopBar;
