import { Box, createStyles } from '@mantine/core';

import SideBarBody from './SideBarBody';
import SideBarFooter from './SideBarFooter';

const useStyles = createStyles((theme) => ({
  sideBar: {
    width: '200px',
    height: '100vh',
    color: theme.colors.lmsLayout[5],
    borderRight: `1px solid ${theme.colors.lmsBorder[3]}`,
    position: 'fixed',
    top: '60px',
    left: '-200px',
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

export function SideBar({ sidebarOpened, setSidebarOpened, lmsRole }) {
  const { classes, cx } = useStyles();

  return (
    <Box className={cx(classes.sideBar, { [classes.sideBarToggle]: sidebarOpened })}>
      <SideBarBody setSidebarOpened={setSidebarOpened} lmsRole={lmsRole} />
      <SideBarFooter lmsRole={lmsRole} />
    </Box>
  );
}

export default SideBar;
