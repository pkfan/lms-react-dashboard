import { useEffect } from 'react';
import { Box, createStyles } from '@mantine/core';
import { Outlet, useNavigate } from 'react-router-dom';
import FullPageLoader from '@/components/common/FullPageLoader';
import { useGetAuthUserQuery } from '@/views/auth/api';
import { useDispatch } from 'react-redux';
import { setAuthUser as setAuthUserAction } from '@/views/auth/slice/authSlice';

const useStyles = createStyles((theme) => ({
  lmsLayout: {
    marginTop: '60px',

    [`@media (min-width: ${theme.breakpoints.sm}px)`]: {
      marginLeft: '200px',
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
  const {
    isSuccess: isAuthUserSuccess,
    isFetching: isAuthUserFetching,
    isError: isAuthUserError,
    data: authUserData,
  } = useGetAuthUserQuery();

  const authUserDispatch = useDispatch();

  useEffect(() => {
    if (isAuthUserError) {
      console.log('isAuthUserError login useEffect lmsLayout', isAuthUserError);
      navigate('/lms/login');
    }
    if (isAuthUserSuccess) {
      // console.log('=========authuserdata==========', setAuthUserAction(authUserData));
      authUserDispatch(setAuthUserAction(authUserData));
    }
  }, [isAuthUserError, isAuthUserSuccess]);

  return (
    <>
      {isAuthUserFetching && <FullPageLoader />}

      {isAuthUserSuccess && (
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
