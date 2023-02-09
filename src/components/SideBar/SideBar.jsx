import { Box, createStyles } from '@mantine/core';

import SideBarBody from './SideBarBody';
import SideBarFooter from './SideBarFooter';

const useStyles = createStyles((theme) => ({
  sideBar: {
    width: '235px',
    height: '100vh',
    color: theme.colors.lmsLayout[5],
    borderRight: `1px solid ${theme.colors.lmsBorder[3]}`,
    position: 'fixed',
    top: '48px',
    left: '-235px',
    zIndex: '110',
    backgroundColor: theme.colors.lmsSkin[0],
    transition: 'all 300ms ease-in-out',
    [`@media (min-width: ${theme.breakpoints.sm}px)`]: {
      left: 0,
    },
  },
  sideBarToggle: {
    left: '0!important',
  },
}));

export function SideBar({ sidebarOpened, setSidebarOpened }) {
  const { classes, cx } = useStyles();

  return (
    <Box className={cx(classes.sideBar, { [classes.sideBarToggle]: sidebarOpened })}>
      <SideBarBody setSidebarOpened={setSidebarOpened} />
      <SideBarFooter />
    </Box>
  );
}

export default SideBar;
