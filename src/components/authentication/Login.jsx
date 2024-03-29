import {
  createStyles,
  Flex,
  Paper,
  Text,
  Button,
  Divider,
  Anchor,
  Checkbox,
  TextInput,
  PasswordInput,
} from '@mantine/core';
import { useForm, isEmail, hasLength } from '@mantine/form';

import { FaFacebookSquare, FaTwitterSquare, FaUser, FaKey } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { MdEmail } from 'react-icons/md';

import SocialAuthButton from './SocialAuthButton';

import inputStyles from '@/styles/inputStyles';
import Logo from '@/components/Logo';

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
  const { classes } = useStyles();
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
      remember_me: false,
    },

    validate: {
      email: isEmail('Invalid email'),
      password: hasLength({ min: 8 }, 'Invalid password'),
    },
  });

  // useEffect(() => {
  //   form.setErrors({ password: 'Too short', email: 'Invalid email' });
  // }, []);

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
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
          <SocialAuthButton sx={classes.variant} variant="outline" icon={<FcGoogle size={24} />}>
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
              name="remember_me"
              {...form.getInputProps('remember_me')}
            />

            <Anchor href="https://mantine.dev/">Forget Password</Anchor>
          </Flex>
          <Flex justify="end" align="center" w="100%" maw={350}>
            <Button type="submit">SIGN IN</Button>
          </Flex>
          <Text>
            Not a member?{' '}
            <Anchor fw={500} href="https://mantine.dev/">
              Register
            </Anchor>
          </Text>
        </Paper>
      </Flex>
    </form>
  );
}

export default Login;
