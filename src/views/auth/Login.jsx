import { useEffect } from 'react';

import {
  createStyles,
  Flex,
  Paper,
  Text,
  Divider,
  Anchor,
  Checkbox,
  TextInput,
  PasswordInput,
} from '@mantine/core';
import { useForm, isEmail, hasLength } from '@mantine/form';
import { useNavigate, Link } from 'react-router-dom';
import Button from '@/components/common/Button';

import {
  showLoadingNotification,
  updateLoadingNotificationError,
  updateLoadingNotificationSuccess,
} from '@/helpers/notification';

import { FaFacebookSquare, FaTwitterSquare, FaUser, FaKey } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { MdEmail } from 'react-icons/md';

import SocialAuthButton from './SocialAuthButton';

import inputStyles from '@/styles/inputStyles';
import Logo from '@/components/Logo';

import { useLoginMutation } from './api';
import { useGetAuthUserQuery } from './api';
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

export function Login() {
  const { isSuccess, isFetching, isError } = useGetAuthUserQuery();
  const [login, { isLoading, isSuccess: isLoginSuccess, error, isError: isLogginError }] =
    useLoginMutation();
  const navigate = useNavigate();

  console.log('error login : ', error);

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

  useEffect(() => {
    if (isSuccess || isLoginSuccess) {
      updateLoadingNotificationSuccess({
        id: 'login',
        message: 'Your are logged in successfully',
        time: 1000,
      });
      setTimeout(() => {
        navigate('/admin/dashboard');
      }, 1000);
    }

    if (isLogginError) {
      updateLoadingNotificationError({
        id: 'login',
        message: 'Error while logging in to your account',
        time: 3000,
      });
    }
  }, [isLoginSuccess, isSuccess, isLogginError]);

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
      {isFetching && <FullPageLoader />}

      {isError && (
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
            <Logo width="80px" />
            <Text fz={24}>Sign in to Pkfan</Text>
            <Paper shadow="xl" className={classes.paper}>
              <SocialAuthButton
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
              />

              <Text fz={14} fw={700} sx={(theme) => ({ color: theme.colors.red[5] })}>
                {error?.errors}
              </Text>

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

                <Anchor href="https://mantine.dev/">Forget Password</Anchor>
              </Flex>
              <Flex justify="end" align="center" w="100%" maw={350}>
                <Button type="submit" loading={isLoading}>
                  SIGN IN
                </Button>
              </Flex>
              <Text>
                Not a member?{' '}
                <Anchor component={Link} fw={500} to="/register">
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
