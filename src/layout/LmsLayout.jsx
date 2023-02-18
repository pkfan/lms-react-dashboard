import { useEffect } from 'react';
import { Box, createStyles } from '@mantine/core';
import { Outlet, useNavigate } from 'react-router-dom';
import FullPageLoader from '@/components/common/FullPageLoader';
import { useGetAuthUserQuery } from '@/views/auth/api';

const useStyles = createStyles((theme) => ({
  lmsLayout: {
    marginTop: '60px',

    [`@media (min-width: ${theme.breakpoints.sm}px)`]: {
      marginLeft: '235px',
    },
  },
  main: {
    display: 'flex',
    maxWidth: '1165px',
    margin: '0 auto',
    padding: '16px',
    position: 'relative',
    // background: 'yellow',
  },
}));

export function LmsLayout({ children }) {
  const { classes } = useStyles();

  const navigate = useNavigate();
  const { isError, isFetching, isSuccess } = useGetAuthUserQuery();

  useEffect(() => {
    if (isError) {
      console.log('isError login useEffect lmsLayout', isError);
      navigate('/lms/login');
    }
  }, [isError]);

  return (
    <>
      {isFetching && <FullPageLoader />}

      {isSuccess && (
        <Box className={classes.lmsLayout}>
          {children}
          <Box component="main" className={classes.main}>
            <Outlet />
          </Box>
        </Box>
      )}
    </>
  );
}

export default LmsLayout;
