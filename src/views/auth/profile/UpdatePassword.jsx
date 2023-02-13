import { useEffect } from 'react';
import { createStyles, Flex, PasswordInput, Box, Title } from '@mantine/core';
import Alert from '@/components/common/Alert';
import Paper from '@/components/common/Paper';
import Button from '@/components/common/Button';
import {
  showLoadingNotification,
  updateLoadingNotificationError,
  updateLoadingNotificationSuccess,
} from '@/helpers/notification';

import { useForm } from '@mantine/form';

import { FaKey } from 'react-icons/fa';

import inputStyles from '@/styles/inputStyles';
import { useUpdatePasswordMutation } from '../api';

const useStyles = createStyles(() => ({
  container: {
    width: '100%',
    padding: '36px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '16px',
  },
}));

export function UpdatePassword() {
  const { classes } = useStyles();
  const [
    updatePassword,
    {
      error: updatePasswordError,
      isLoading: isUpdatePasswordLoading,
      isSuccess: isUpdatePasswordSuccess,
      isError: isUpdatePasswordError,
    },
  ] = useUpdatePasswordMutation();

  const form = useForm({
    initialValues: {
      current_password: '',
      password: '',
      password_confirmation: '',
    },

    validate: {
      current_password: (value) => {
        const regularExpression = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        let isValid = regularExpression.test(value);

        if (isValid) {
          return null;
        }
        return 'Your Current password is invalid, retype correct password.';
      },
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
    if (isUpdatePasswordSuccess) {
      updateLoadingNotificationSuccess({
        id: 'UpdatePassword',
        message: 'Password updated successfully',
        time: 6000,
      });
    }

    if (isUpdatePasswordError) {
      updateLoadingNotificationError({
        id: 'UpdatePassword',
        message: 'Password errors.',
        time: 3000,
      });
      console.log('updatePasswordError?.errors', updatePasswordError);
    }
  }, [isUpdatePasswordSuccess, isUpdatePasswordError]);

  const onSubmitHandle = (values) => {
    updatePassword(values);
    console.log('UpdatePassword values : ', values);

    showLoadingNotification({
      id: 'UpdatePassword',
      title: 'Updating password...',
      message: 'we are Updating your password.',
    });
  };

  return (
    <form onSubmit={form.onSubmit(onSubmitHandle)}>
      <Paper>
        <Title
          order={3}
          sx={(theme) => ({
            borderBottom: `1px solid ${theme.colors.lmsLayout[3]}`,
            paddingBottom: '8px',
          })}
        >
          Change Password
        </Title>

        <Box className={classes.container}>
          {isUpdatePasswordError && (
            <Alert title="Errors!" color="red" errors={updatePasswordError?.errors} />
          )}

          <PasswordInput
            label="Current Password"
            placeholder="Your Current Password"
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
            name="current_password"
            {...form.getInputProps('current_password')}
          />
          <PasswordInput
            label="New Password"
            placeholder="Your Password"
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
            label="Retype New Password"
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
          <Flex justify="end" align="center" w="100%" mt={24} maw={350}>
            <Button type="submit" loading={isUpdatePasswordLoading}>
              SAVE CHANGES
            </Button>
          </Flex>
        </Box>
      </Paper>
    </form>
  );
}

export default UpdatePassword;
