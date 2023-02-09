import { useState } from 'react';
import {
  createStyles,
  Flex,
  Paper,
  Text,
  Button,
  Divider,
  Anchor,
  // Checkbox,
  TextInput,
  PasswordInput,
} from '@mantine/core';

import { getUserCountryDetails, getAllCountries } from 'user-detail-from-browser';
import PhoneNumberInput from '@/components/PhoneNumberInput';
import CountrySelect from '@/components/CountrySelect';

import { Link } from 'react-router-dom';

import { useForm, isEmail, hasLength } from '@mantine/form';

import { FaFacebookSquare, FaTwitterSquare, FaUser, FaKey, FaPhone } from 'react-icons/fa';
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

export function Register() {
  // `value` will be the parsed phone number in E.164 format.
  // Example: "+12133734253".
  const [phoneNumberValue, setPhoneNumberValue] = useState();
  console.log('phoneNumberValue', phoneNumberValue);
  const { classes } = useStyles();
  const userCountryDetail = getUserCountryDetails();
  const defaultCountryCode = userCountryDetail.country_code_two;
  const [countryCode, setCountryCode] = useState(defaultCountryCode);

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
      remember_me: false,
      phone_number: userCountryDetail.phone_code,
    },

    validate: {
      full_name: hasLength({ min: 8 }, 'Too short'),
      user_name: hasLength({ min: 8 }, 'Too short'),
      email: isEmail('Invalid email'),
      password: hasLength({ min: 8 }, 'Invalid password'),
      confirm_password: hasLength({ min: 8 }, 'Invalid password'),
      phone_number: hasLength({ min: 6 }, 'Please Enter your phone Number'),
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
        <Text fz={24}>Sign up to Pkfan</Text>
        <Paper shadow="xl" className={classes.paper}>
          <SocialAuthButton sx={classes.variant} variant="outline" icon={<FcGoogle size={24} />}>
            Sign up with Google
          </SocialAuthButton>
          <SocialAuthButton sx={classes.facebook} icon={<FaFacebookSquare size={24} />}>
            Sign up with Facebook
          </SocialAuthButton>
          <SocialAuthButton sx={classes.twitter} icon={<FaTwitterSquare size={24} />}>
            Sign up with Twitter
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
                <Text ml={5}>OR</Text>
              </>
            }
          />

          <TextInput
            sx={inputStyles}
            withAsterisk
            label="Full Name"
            name="full_name"
            required
            icon={<FaUser size={16} style={{ opacity: 0.7 }} />}
            placeholder="Your full name"
            {...form.getInputProps('full_name')}
          />

          <TextInput
            sx={inputStyles}
            withAsterisk
            label="Email"
            required
            icon={<MdEmail size={16} style={{ opacity: 0.7 }} />}
            placeholder="your@email.com"
            {...form.getInputProps('email')}
          />

          <CountrySelect
            allCountries={getAllCountries()}
            countryCode={countryCode}
            setCountryCode={setCountryCode}
          />

          <PhoneNumberInput
            icon={<FaPhone size={16} style={{ opacity: 0.7 }} />}
            defaultCountry={countryCode}
            id="PhoneNumber"
            phoneNumberValue={phoneNumberValue}
            setPhoneNumberValue={setPhoneNumberValue}
            label="Phone Number"
          />
          <PasswordInput
            label="Password"
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
            name="password"
            {...form.getInputProps('confirm_password')}
          />
          {/* <Flex justify="space-between" align="center" w="100%" maw={350}>
            <Checkbox
              label={
                <Text>
                  I agree with{' '}
                  <Anchor fw={500} href="https://mantine.dev/">
                    Terms & Rules
                  </Anchor>
                </Text>
              }
              name="remember_me"
              {...form.getInputProps('remember_me')}
            />
          </Flex> */}
          <Flex justify="end" align="center" w="100%" maw={350}>
            <Button type="submit">SIGN UP</Button>
          </Flex>
          <Text>
            Already have an account?{' '}
            <Anchor component={Link} fw={500} to="/login">
              Login
            </Anchor>
          </Text>
        </Paper>
      </Flex>
    </form>
  );
}

export default Register;
