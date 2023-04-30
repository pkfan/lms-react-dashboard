import { useState, useEffect } from 'react';
import {
  createStyles,
  Flex,
  Paper,
  Text,
  // Divider,
  Anchor,
  TextInput,
  PasswordInput,
} from '@mantine/core';

import {
  Alert,
  Button,
  FullPageLoader,
  PhoneNumberInput,
  CountrySelect,
  StatesSelect,
  CitySelect,
  Logo,
} from '@/components';

import {
  showLoadingNotification,
  updateLoadingNotificationError,
  updateLoadingNotificationSuccess,
} from '@/helpers/notification';

import { getUserCountryDetails, getAllCountries } from 'user-detail-from-browser';
import { Link, useNavigate } from 'react-router-dom';
import { inputStyles } from '@/styles';
import {
  useGetStatesQuery,
  useGetCitiesQuery,
  useGetAuthUserQuery,
  useRegisterMutation,
} from '@/views/auth/api';

import { useForm, isEmail, hasLength } from '@mantine/form';
import { FaUser, FaKey, FaPhone, MdEmail } from '@/components/icons';

// import { FaFacebookSquare, FaTwitterSquare} from 'react-icons/fa';
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

export function Register() {
  // `value` will be the parsed phone number in E.164 format.
  // Example: "+12133734253".

  const {
    isSuccess: isAuthUserSuccess,
    isFetching: isAuthUserFetching,
    isError: isAuthUserError,
  } = useGetAuthUserQuery();

  const [
    register,
    {
      error: registerError,
      isLoading: isRegisterLoading,
      isSuccess: isRegisterSuccess,
      isError: isRegisterError,
    },
  ] = useRegisterMutation();

  console.log('register registerError email', registerError?.errors?.email);

  const [phoneNumberValue, setPhoneNumberValue] = useState('');
  // console.log('phoneNumberValue', phoneNumberValue);
  const { classes } = useStyles();
  const userCountryDetail = getUserCountryDetails();
  const defaultCountryCode = userCountryDetail.country_code_two;
  const [countryCode, setCountryCode] = useState(defaultCountryCode);

  const {
    isSuccess: isStatesSuccess,
    isFetching: isSatesFetching,
    isError: isStatesError,
    data: states,
  } = useGetStatesQuery(countryCode);

  const [stateId, setStateId] = useState('');

  const {
    isSuccess: isCitiesSuccess,
    isFetching: isCitiesFetching,
    isError: isCitiesError,
    data: cities,
  } = useGetCitiesQuery(stateId);

  const [cityId, setCityId] = useState('');

  const form = useForm({
    initialValues: {
      full_name: '',
      address: '',
      email: '',
      password: '',
      password_confirmation: '',
    },

    validate: {
      full_name: hasLength({ min: 4 }, 'Too short'),
      address: hasLength({ min: 8 }, 'Too short'),
      email: isEmail('Invalid email'),
      // password: hasLength({ min: 8 }, 'Too Short, password must be atleast 8 characters'),
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

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthUserSuccess || isRegisterSuccess) {
      updateLoadingNotificationSuccess({
        id: 'register',
        message: 'Your are registered in successfully',
        time: 1000,
      });
      setTimeout(() => {
        navigate('/lms/login');
      }, 1000);
    }

    if (isRegisterError) {
      updateLoadingNotificationError({
        id: 'register',
        message: 'Error while register your account',
        time: 3000,
      });
    }
  }, [isRegisterSuccess, isAuthUserSuccess, isRegisterError]);

  const [isInvalidFields, setIsInvalidFields] = useState({
    phone: false,
    state: false,
    city: false,
  });

  const validateOtherFields = (values) => {
    let hasNotValidValues = false;
    let state_id = null;
    let city_id = null;
    let phone = null;

    // states validation

    if (states?.length > 0 && stateId) {
      state_id = stateId;

      if (cities?.length > 0 && cityId) {
        city_id = cityId;
      } else if (cities?.length == 0) {
        // pass
      } else {
        // error here
        hasNotValidValues = true;
        setIsInvalidFields({ ...isInvalidFields, city: true });
      }
    } else if (states?.length == 0) {
      // pass
    } else {
      //states error here

      hasNotValidValues = true;
      setIsInvalidFields({ ...isInvalidFields, state: true });
    }

    if (phoneNumberValue && phoneNumberValue.includes('+') && phoneNumberValue.length >= 8) {
      phone = phoneNumberValue.replace('+', '');
    } else {
      hasNotValidValues = true;
      setIsInvalidFields({ ...isInvalidFields, phone: true });
    }

    // uncommnet if all fields are required
    // if (hasNotValidValues) {
    //   return null;
    // }

    values['country_code'] = countryCode;

    return { ...values, state_id, city_id, phone };
  };

  const onSubmitHandle = (values) => {
    values = validateOtherFields(values);

    if (!values) return;
    register(values);
    console.log(values);

    showLoadingNotification({
      id: 'register',
      title: 'Processing...',
      message: 'we are creating your student account',
    });
  };

  return (
    <>
      {isAuthUserFetching && <FullPageLoader />}
      {isAuthUserError && (
        <form onSubmit={form.onSubmit(onSubmitHandle)}>
          <Flex
            className={classes.container}
            justify="center"
            align="center"
            direction="column"
            gap={12}
          >
            <Logo width="160px" />
            <Text fz={24}>Sign up to Pkfan</Text>
            <Paper withBorder shadow="xl" className={classes.paper}>
              {/* <SocialAuthButton
                sx={classes.variant}
                variant="outline"
                icon={<FcGoogle size={24} />}
              >
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
              /> */}

              {isRegisterError && (
                <Alert title="Errors!" color="red" errors={registerError?.errors} />
              )}

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
                error={registerError?.errors?.email}
              />

              <CountrySelect
                allCountries={getAllCountries()}
                countryCode={countryCode}
                setStateId={setStateId}
                setCountryCode={setCountryCode}
              />

              <StatesSelect
                states={states}
                stateId={stateId}
                setStateId={setStateId}
                setCityId={setCityId}
                isSuccess={isStatesSuccess}
                isError={isStatesError}
                isFetching={isSatesFetching}
                isInvalidState={isInvalidFields.state}
              />
              {isStatesSuccess && states.length > 0 && (
                <CitySelect
                  cities={cities}
                  cityId={cityId}
                  stateId={stateId}
                  setCityId={setCityId}
                  isSuccess={isCitiesSuccess}
                  isError={isCitiesError}
                  isFetching={isCitiesFetching}
                  isInvalidCity={isInvalidFields.city}
                />
              )}

              <PhoneNumberInput
                icon={<FaPhone size={16} style={{ opacity: 0.7 }} />}
                defaultCountry={countryCode}
                id="PhoneNumber"
                phoneNumberValue={phoneNumberValue}
                setPhoneNumberValue={setPhoneNumberValue}
                label="Phone Number"
                isInvalidNumber={isInvalidFields.phone}
              />

              <TextInput
                sx={inputStyles}
                withAsterisk
                label="Address"
                name="address"
                required
                icon={<FaUser size={16} style={{ opacity: 0.7 }} />}
                placeholder="Your address"
                {...form.getInputProps('address')}
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
                name="password_confirmation"
                {...form.getInputProps('password_confirmation')}
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
              <Flex mt={16} justify="end" align="center" w="100%" maw={400}>
                <Button type="submit" loading={isRegisterLoading}>
                  SIGN UP
                </Button>
              </Flex>
              <Text>
                Already have an account?{' '}
                <Anchor component={Link} fw={500} to="/lms/login">
                  Login
                </Anchor>
              </Text>
            </Paper>
          </Flex>
        </form>
      )}
    </>
  );
}

export default Register;
