import { useEffect } from 'react';

import { createStyles, Flex, Paper, Text, Alert } from '@mantine/core';
import Button from '@/components/common/Button';
import { IconAlertCircle } from '@tabler/icons';
import { useNavigate, Link } from 'react-router-dom';

import {
  showLoadingNotification,
  updateLoadingNotificationError,
  updateLoadingNotificationSuccess,
} from '@/helpers/notification';

import Logo from '@/components/Logo';

import { useUnverifyEmailNotificationMutation, useGetAuthUserQuery } from '@/views/auth/api';
import FullPageLoader from '@/components/common/FullPageLoader';

const useStyles = createStyles((theme) => ({
  container: {
    marginTop: '36px',
    width: '100%',
    padding: '16px',
    [`@media (min-width: ${theme.breakpoints.sm}px)`]: {
      width: '600px',
    },
  },
  paper: {
    width: '100%',
    padding: '36px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '16px',
    backgroundColor: theme.colors.lmsSkin[0],
    color: theme.colors.lmsSkin[1],
  },
  socialButton: {
    minWidth: '210px',
  },
  variant: {
    '&:hover': {
      backgroundColor: 'rgba(0,0,0,0.06)!important',
    },
  },
  facebook: {
    color: '#fff',
    backgroundColor: '#356BC4',
    '&:hover': {
      backgroundColor: '#2a559c',
    },
  },
  twitter: {
    color: '#fff',
    backgroundColor: '#27AAE1',
    '&:hover': {
      backgroundColor: '#1a8bbb',
    },
  },
}));

export function UnverifyEmailNotification() {
  const navigate = useNavigate();
  const { classes } = useStyles();
  const {
    isSuccess: isAuthUserSuccess,
    isFetching: isAuthUserFetching,
    isError: isAuthUserError,
  } = useGetAuthUserQuery();
  const [
    unverifyEmailNotification,
    {
      isLoading: isUnverifyEmailNotificationLoading,
      isSuccess: isUnverifyEmailNotificationSuccess,
      isError: isUnverifyEmailNotificationError,
    },
  ] = useUnverifyEmailNotificationMutation();

  useEffect(() => {
    if (isUnverifyEmailNotificationSuccess) {
      updateLoadingNotificationSuccess({
        id: 'UnverifyEmailNotification',
        message:
          'A new verification link has been sent to the email address you provided. Kindly! check your email now.',
        time: 30000,
      });
    }

    if (isUnverifyEmailNotificationError) {
      updateLoadingNotificationError({
        id: 'UnverifyEmailNotification',
        message: 'Email sending Error.',
        time: 3000,
      });
    }

    if (isAuthUserError) {
      navigate('/lms/login');
    }
  }, [isUnverifyEmailNotificationSuccess, isAuthUserError, isUnverifyEmailNotificationError]);

  const onSubmitHandle = () => {
    unverifyEmailNotification();
    showLoadingNotification({
      id: 'UnverifyEmailNotification',
      title: 'Sending Email...',
      message: 'We are sending an email to your inbox.',
    });
  };

  return (
    <>
      {isAuthUserFetching && <FullPageLoader />}

      {isAuthUserSuccess && (
        <Flex
          className={classes.container}
          justify="center"
          align="center"
          direction="column"
          gap={12}
        >
          <Logo width="80px" />
          <Text fz={24}>Email Verification </Text>
          <Paper withBorder shadow="xl" className={classes.paper}>
            <Alert title="Verify Your Email." icon={<IconAlertCircle size={16} />} color="yellow">
              <Text>
                Before continuing, could you verify your email address by clicking on the link we
                just emailed to you?
                <br />
                <br />
                If you didn't receive the email, we will gladly send you another.
              </Text>
            </Alert>
            <Flex
              justify="center"
              align="center"
              gap={8}
              w="100%"
              maw={400}
              direction={{ base: 'column', sm: 'row' }}
            >
              <Button onClick={onSubmitHandle} loading={isUnverifyEmailNotificationLoading}>
                Resend Verification Email
              </Button>
              <Button variant="lmsSecondary" component={Link} to="/dashboard/student/index">
                Remind Me Later
              </Button>
            </Flex>
          </Paper>
        </Flex>
      )}
    </>
  );
}

export default UnverifyEmailNotification;
