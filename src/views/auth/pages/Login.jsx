import { useEffect } from 'react';

import {
  createStyles,
  Flex,
  Paper,
  Text,
  // Divider,
  Anchor,
  Checkbox,
  TextInput,
  PasswordInput,
} from '@mantine/core';
import { useForm, isEmail, hasLength } from '@mantine/form';
import { useNavigate, Link } from 'react-router-dom';
import { Alert, Button, Logo, FullPageLoader } from '@/components';
import {
  showLoadingNotification,
  updateLoadingNotificationError,
  updateLoadingNotificationSuccess,
} from '@/helpers/notification';
import { inputStyles } from '@/styles';
import { useDispatch } from 'react-redux';
import { setAuthUser as setAuthUserAction } from '@/views/auth/slice/authSlice';
import {
  useGetAuthUserQuery,
  useDeleteOtherSessionRecordsMutation,
  useLoginMutation,
} from '@/views/auth/api';

import { MdEmail, FaKey } from '@/components/icons';

// import { FaFacebookSquare, FaTwitterSquare, FaUser } from 'react-icons/fa';
// import { FcGoogle } from 'react-icons/fc';
// import SocialAuthButton from '../components/SocialAuthButton';

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

export function Login() {
  const {
    isSuccess: isAuthUserSuccess,
    isFetching: isAuthUserFetching,
    isError: isAuthUserError,
    data: authUserData,
    refetch: authUserRefetch,
  } = useGetAuthUserQuery();
  const [
    login,
    {
      isLoading: isLoginLoading,
      isSuccess: isLoginSuccess,
      error: loginError,
      isError: isLoginError,
    },
  ] = useLoginMutation();
  const [deleteOtherSessionRecords] = useDeleteOtherSessionRecordsMutation();
  const navigate = useNavigate();

  const { classes } = useStyles();
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
      remember: false,
    },

    validate: {
      email: isEmail('Invalid email'),
      password: hasLength({ min: 8 }, 'Invalid password'),
    },
  });

  const authUserDispatch = useDispatch();

  useEffect(() => {
    // delete user other browser sessions
    if (isLoginSuccess) {
      if (!authUserData) {
        authUserRefetch();
        return;
      }

      deleteOtherSessionRecords();
    }
    if (isAuthUserSuccess || isLoginSuccess) {
      authUserDispatch(setAuthUserAction(authUserData));

      if (authUserData && !authUserData?.email_verified_at) {
        navigate('/lms/email/verification');
      } else {
        const redirectUrl = sessionStorage.getItem('login-redirect-url');

        if (redirectUrl && redirectUrl != 'null' && redirectUrl != 'undefined') {
          // reset session storage
          sessionStorage.setItem('login-redirect-url', null);
          navigate(redirectUrl);
        } else {
          navigate('/dashboard/student/index');
        }
      }
      updateLoadingNotificationSuccess({
        id: 'login',
        message: 'Your are logged in successfully',
        time: 4000,
      });
    }

    if (isLoginError) {
      updateLoadingNotificationError({
        id: 'login',
        message: 'Error while logging in to your account',
        time: 3000,
      });
    }
  }, [isLoginSuccess, isAuthUserSuccess, isLoginError, authUserData]);

  const onSubmit = (values) => {
    login(values);
    showLoadingNotification({
      id: 'login',
      title: 'Processing...',
      message: 'Logging in to dashboard',
    });
  };

  return (
    <>
      {isAuthUserFetching && <FullPageLoader />}

      {isAuthUserError && (
        <form
          onSubmit={form.onSubmit((values) => {
            onSubmit(values);
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
            <Text fz={24}>Sign in to Pkfan</Text>
            <Paper withBorder shadow="xl" className={classes.paper}>
              {/* <SocialAuthButton
                sx={classes.variant}
                variant="outline"
                icon={<FcGoogle size={24} />}
              >
                Sign in with Google
              </SocialAuthButton>
              <SocialAuthButton sx={classes.facebook} icon={<FaFacebookSquare size={24} />}>
                Sign in with Facebook
              </SocialAuthButton>
              <SocialAuthButton sx={classes.twitter} icon={<FaTwitterSquare size={24} />}>
                Sign in with Twitter
              </SocialAuthButton>

              <Divider
                my="xs"
                variant="dashed"
                labelPosition="center"
                w="100%"
                size="sm"
                sx={{ color: 'inherit' }}
                label={
                  <>
                    <FaUser size={12} />
                    <Text ml={5}>Continue with Email</Text>
                  </>
                }
              /> */}

              {isLoginError && <Alert title="Errors!" color="red" errors={loginError?.errors} />}

              <TextInput
                sx={inputStyles}
                withAsterisk
                label="Email"
                icon={<MdEmail size={16} style={{ opacity: 0.7 }} />}
                placeholder="your@email.com"
                {...form.getInputProps('email')}
              />

              <PasswordInput
                label="Password"
                withAsterisk
                placeholder="Your Password"
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
              <Flex justify="space-between" align="center" w="100%" maw={350}>
                <Checkbox
                  label="Rememeber Me"
                  name="remember"
                  {...form.getInputProps('remember')}
                />

                <Anchor component={Link} fw={500} to="/lms/forget-password">
                  Forget Password
                </Anchor>
              </Flex>
              <Flex justify="end" align="center" w="100%" maw={400}>
                <Button type="submit" loading={isLoginLoading}>
                  SIGN IN
                </Button>
              </Flex>
              <Text>
                Not a member?{' '}
                <Anchor component={Link} fw={500} to="/lms/register">
                  Register
                </Anchor>
              </Text>
            </Paper>
          </Flex>
        </form>
      )}
    </>
  );
}

export default Login;
