import { useState, useEffect } from 'react';
import { Modal, Group, PasswordInput, Stack } from '@mantine/core';
import { useConfirmPasswordMutation, useConfirmPasswordStatusQuery } from '@/views/auth/api';
import { useForm, hasLength } from '@mantine/form';
import Button from '@/components/common/Button';
import { FaKey } from 'react-icons/fa';
import { IconCheck } from '@tabler/icons';
import { showNotification } from '@mantine/notifications';
import { setIsPasswordConfirm as setIsPasswordConfirmAction } from '@/views/auth/slice/authSlice';
import { useDispatch } from 'react-redux';

export function ConfirmPasswordModal({ opened, close }) {
  const confirmPasswordDispatch = useDispatch();
  const form = useForm({
    initialValues: {
      password: '',
    },

    validate: {
      password: hasLength({ min: 8 }, 'Invalid password'),
    },
  });

  const {
    isSuccess: isConfirmPasswordStatusSuccess,
    // isFetching: isConfirmPasswordStatusFetching,
    // isError: isConfirmPasswordStatusError,
    data: confirmPasswordStatus,
  } = useConfirmPasswordStatusQuery();

  console.log('confirmPasswordStatus ====', confirmPasswordStatus);

  const [
    confirmPassword,
    {
      isSuccess: isConfirmPasswordSuccess,
      isLoading: isConfirmPasswordLoading,
      // isError: isConfirmPasswordError,
      error: confirmPasswordError,
      data: confirmPasswordData,
    },
  ] = useConfirmPasswordMutation();

  console.log('confirmPasswordError ===========', confirmPasswordError?.errors?.password);

  useEffect(() => {
    if (isConfirmPasswordStatusSuccess) {
      if (confirmPasswordStatus) {
        // setIsConfirmPassword(confirmPasswordStatus);
        confirmPasswordDispatch(setIsPasswordConfirmAction(confirmPasswordStatus));
      }
    }
    if (isConfirmPasswordSuccess) {
      if (confirmPasswordData) {
        // setIsConfirmPassword(confirmPasswordData);
        confirmPasswordDispatch(setIsPasswordConfirmAction(confirmPasswordData));
        close();
        showNotification({
          id: 'deleteCourseSuccess',
          autoClose: 6000,
          title: 'Success',
          message: 'password confirmed Successfully',
          color: 'teal',
          icon: <IconCheck />,
          loading: false,
        });
      }
    }

    if (confirmPasswordError) {
      form.setFieldError('password', confirmPasswordError?.errors?.password);
    }
  }, [isConfirmPasswordStatusSuccess, isConfirmPasswordSuccess, confirmPasswordError]);

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="Confrim Your Password"
        size="xl"
        sx={(theme) => ({
          '& .mantine-Modal-title': {
            fontWeight: 'bold',
            fontSize: '20px',
            color: theme.colors.lmsPrimary[6],
          },
        })}
      >
        <form
          onSubmit={form.onSubmit((values) => confirmPassword(values.password))}
          style={{ width: '100%' }}
        >
          <Stack w="70%" mx="auto">
            <PasswordInput
              sx={(theme) => ({
                width: '100%',
                '& input': {
                  backgroundColor: theme.colors.lmsLayout[1],
                },
                '& input::placeholder': {
                  color: theme.colors.lmsLayout[4],
                },
              })}
              withAsterisk
              label="Password"
              placeholder="Enter your password"
              {...form.getInputProps(`password`)}
            />
            <Button
              type="submit"
              color="lmsPrimary"
              leftIcon={<FaKey size={18} />}
              loading={isConfirmPasswordLoading}
            >
              Confirm Password
            </Button>
          </Stack>
        </form>
      </Modal>
    </>
  );
}

export default ConfirmPasswordModal;
