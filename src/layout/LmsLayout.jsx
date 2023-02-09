import { useState, useEffect } from 'react';
import { Box, createStyles } from '@mantine/core';
import { Outlet, useNavigate } from 'react-router-dom';
import FullPageLoader from '@/components/common/FullPageLoader';
import { useGetAuthUserQuery } from '@/views/auth/api';

import { SideBar } from '@/components/SideBar/SideBar';
import TopBar from '@/components/TopBar';

const useStyles = createStyles((theme) => ({
  lmsLayout: {
    marginTop: '48px',

    [`@media (min-width: ${theme.breakpoints.sm}px)`]: {
      marginLeft: '235px',
    },
  },
  main: {
    display: 'flex',
    maxWidth: '1165px',
    margin: '0 auto',
    padding: '16px',
    background: 'yellow',
  },
}));

export function LmsLayout() {
  const { classes } = useStyles();
  const [sidebarOpened, setSidebarOpened] = useState(false);
  const navigate = useNavigate();
  const { isError, isFetching, isSuccess } = useGetAuthUserQuery();

  useEffect(() => {
    if (isError) {
      navigate('/login');
    }
  }, [isError]);

  return (
    <>
      {isFetching && <FullPageLoader />}

      {isSuccess && (
        <Box className={classes.lmsLayout}>
          <TopBar sidebarOpened={sidebarOpened} setSidebarOpened={setSidebarOpened} />
          <SideBar sidebarOpened={sidebarOpened} setSidebarOpened={setSidebarOpened} />
          <Box component="main" className={classes.main}>
            <Outlet />
          </Box>
        </Box>
      )}
    </>
  );
}

export default LmsLayout;
