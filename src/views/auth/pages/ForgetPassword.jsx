import { useEffect } from 'react';
import { createStyles, Flex, Text, TextInput, Paper } from '@mantine/core';
import { Alert, Button, Logo, FullPageLoader } from '@/components';
import { useForm, isEmail } from '@mantine/form';
import { useNavigate } from 'react-router-dom';
import { MdEmail } from '@/components/icons';
import {
  showLoadingNotification,
  updateLoadingNotificationError,
  updateLoadingNotificationSuccess,
} from '@/helpers/notification';
import { inputStyles } from '@/styles';
import { useGetAuthUserQuery, useForgetPasswordMutation } from '@/views/auth/api';

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

export function ForgetPassword() {
  const { classes } = useStyles();
  const {
    isSuccess: isAuthUserSuccess,
    isFetching: isAuthUserFetching,
    isError: isAuthUserError,
  } = useGetAuthUserQuery();
  const [
    forgetPassword,
    {
      isLoading: isForgetPasswordLoading,
      isSuccess: isForgetPasswordSuccess,
      error: forgetPasswordError,
      isError: isForgetPasswordError,
    },
  ] = useForgetPasswordMutation();
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      email: '',
    },

    validate: {
      email: isEmail('Invalid email'),
    },
  });

  useEffect(() => {
    if (isAuthUserSuccess) {
      navigate('/dashboard/student/index');
    }
    if (isForgetPasswordSuccess) {
      updateLoadingNotificationSuccess({
        id: 'forgetPassword',
        message: 'Reset link has been sent to your Email Address',
        time: 6000,
      });
    }

    if (isForgetPasswordError) {
      updateLoadingNotificationError({
        id: 'forgetPassword',
        message: 'Invalid Email Address',
        time: 3000,
      });
    }
  }, [isForgetPasswordSuccess, isAuthUserSuccess, isForgetPasswordError]);

  const onSubmitHandle = (values) => {
    forgetPassword(values);
    showLoadingNotification({
      id: 'forgetPassword',
      title: 'Processing...',
      message: 'Checking your email address and sending an email...',
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
            <Logo width="160px" />
            <Text fz={24}>Forget Password</Text>
            <Paper withBorder shadow="xl" className={classes.paper}>
              {isForgetPasswordError && (
                <Alert title="Errors!" color="red" errors={forgetPasswordError?.errors} />
              )}
              {isForgetPasswordSuccess && (
                <Alert
                  title="Success!"
                  color="green"
                  errors={
                    'Instructions to reset your password have been sent to your Email Address.'
                  }
                />
              )}

              <TextInput
                sx={inputStyles}
                withAsterisk
                label="Enter Your Email"
                icon={<MdEmail size={16} style={{ opacity: 0.7 }} />}
                placeholder="your@email.com"
                {...form.getInputProps('email')}
              />

              <Flex justify="end" align="center" w="100%" maw={400}>
                <Button type="submit" loading={isForgetPasswordLoading}>
                  SEND EMAIL
                </Button>
              </Flex>
            </Paper>
          </Flex>
        </form>
      )}
    </>
  );
}

export default ForgetPassword;
