import { useEffect } from 'react';
import { createStyles, Flex, Paper, Text, TextInput, PasswordInput, Anchor } from '@mantine/core';
import { useForm, isEmail } from '@mantine/form';
import { Alert, Button, Logo, FullPageLoader } from '@/components';
import { useNavigate, useLocation, Link } from 'react-router-dom';

import {
  showLoadingNotification,
  updateLoadingNotificationError,
  updateLoadingNotificationSuccess,
} from '@/helpers/notification';

import { FaKey, MdEmail } from '@/components/icons';
import { inputStyles } from '@/styles';
import { useGetAuthUserQuery, useResetPasswordMutation } from '@/views/auth/api';

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
}));

export function ResetPassword() {
  const location = useLocation();
  const token = location.pathname.split('/')[3];
  const email = location.search.split('=')[1];
  //   console.log('token resetPassword', token);
  //   console.log('email resetPassword', email);
  const { classes } = useStyles();
  const {
    isSuccess: isAuthUserSuccess,
    isFetching: isAuthUserFetching,
    isError: isAuthUserError,
  } = useGetAuthUserQuery();
  const [
    resetPassword,
    {
      isLoading: isResetPasswordLoading,
      isSuccess: isResetPasswordSuccess,
      error: resetPasswordError,
      isError: isResetPasswordError,
    },
  ] = useResetPasswordMutation();
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      email: email,
      password: '',
      password_confirmation: '',
    },

    validate: {
      email: isEmail('Invalid email'),
      password: (value) => {
        const regularExpression = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        let isValid = regularExpression.test(value);

        if (isValid) {
          return null;
        }
        return 'Password must be atleast 8 characters, and contains !@#$%^&* with Capital, Small letters ';
      },
      password_confirmation: (value, values) =>
        value !== values.password ? 'Passwords did not match' : null,
    },
  });

  useEffect(() => {
    if (isAuthUserSuccess) {
      navigate('/dashboard/student/index');
    }
    if (isResetPasswordSuccess) {
      updateLoadingNotificationSuccess({
        id: 'ResetPassword',
        message: 'Password updated successfully.',
        time: 6000,
      });
    }

    if (isResetPasswordError) {
      updateLoadingNotificationError({
        id: 'ResetPassword',
        message: 'Password reseting error',
        time: 3000,
      });
    }
  }, [isResetPasswordSuccess, isAuthUserSuccess, isResetPasswordError]);

  const onSubmitHandle = (values) => {
    console.log({ ...values, token });
    resetPassword({ ...values, token });
    showLoadingNotification({
      id: 'ResetPassword',
      title: 'Creating new password...',
      message: 'we are reseting your password...',
    });
  };

  return (
    <>
      {isAuthUserFetching && <FullPageLoader />}

      {isAuthUserError && (
        <form
          onSubmit={form.onSubmit((values) => {
            onSubmitHandle(values);
          })}
        >
          <Flex
            className={classes.container}
            justify="center"
            align="center"
            direction="column"
            gap={12}
          >
            <Logo width="80px" />
            <Text fz={24}>Reset Your Password</Text>
            <Paper withBorder shadow="xl" className={classes.paper}>
              {isResetPasswordError && (
                <Alert title="Errors!" color="red" errors={resetPasswordError?.errors} />
              )}
              {isResetPasswordSuccess && (
                <Alert
                  title="Success!"
                  color="green"
                  errors={
                    <Text>
                      Password has been reset successfully.{'  '}
                      <Anchor component={Link} color="blue" fw={500} to="/lms/login">
                        Login
                      </Anchor>{' '}
                      now.
                    </Text>
                  }
                />
              )}
              <TextInput
                sx={inputStyles}
                withAsterisk
                label="Your Email"
                icon={<MdEmail size={16} style={{ opacity: 0.7 }} />}
                placeholder="your@email.com"
                {...form.getInputProps('email')}
              />
              <PasswordInput
                label="Create New Password"
                placeholder="Your new Password"
                required
                sx={[
                  inputStyles,
                  {
                    '& .mantine-ActionIcon-root:hover': {
                      background: 'transparent!important',
                    },
                  },
                ]}
                icon={<FaKey size={16} style={{ opacity: 0.7 }} />}
                name="password"
                {...form.getInputProps('password')}
              />
              <PasswordInput
                label="Retype Password"
                placeholder="Retype Password again"
                required
                sx={[
                  inputStyles,
                  {
                    '& .mantine-ActionIcon-root:hover': {
                      background: 'transparent!important',
                    },
                  },
                ]}
                icon={<FaKey size={16} style={{ opacity: 0.7 }} />}
                name="password_confirmation"
                {...form.getInputProps('password_confirmation')}
              />

              <Flex justify="end" align="center" w="100%" maw={400}>
                <Button type="submit" loading={isResetPasswordLoading}>
                  RESET
                </Button>
              </Flex>
            </Paper>
          </Flex>
        </form>
      )}
    </>
  );
}

export default ResetPassword;
