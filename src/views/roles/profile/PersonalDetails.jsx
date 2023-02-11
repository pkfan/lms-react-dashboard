import { useState, useEffect } from 'react';
import { createStyles, Flex, TextInput, Title, Box, Textarea } from '@mantine/core';
import Paper from '@/components/common/Paper';
import Button from '@/components/common/Button';
import { store } from '@/store';
// import {
//   showLoadingNotification,
//   updateLoadingNotificationError,
//   updateLoadingNotificationSuccess,
// } from '@/helpers/notification';

import { getAllCountries } from 'user-detail-from-browser';
import PhoneNumberInput from '@/components/PhoneNumberInput';
import CountrySelect from '@/components/CountrySelect';
import StatesSelect from '@/components/StatesSelect';
import CitySelect from '@/components/CitySelect';

import { useForm, isEmail, hasLength } from '@mantine/form';

import { FaUser, FaPhone } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { ImLocation2 } from 'react-icons/im';

import inputStyles from '@/styles/inputStyles';
import { useGetStatesQuery, useGetCitiesQuery, useGetAuthUserQuery } from '@/views/auth/api';

const useStyles = createStyles(() => ({
  container: {
    width: '100%',
    padding: '36px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '16px',
    // backgroundColor: theme.colors.lmsSkin[0],
    // color: theme.colors.lmsSkin[1],
  },
}));

export function PersonalDetails({ setScrollLocked, setVisibleOverlay }) {
  const { classes } = useStyles();
  const {
    data: authUserData,
    isSuccess: isAuthUserSuccess,
    isFetching: isAuthUserFetching,
    isError: isAuthUserError,
  } = useGetAuthUserQuery();

  console.log('authUserData', authUserData);

  const [phoneNumberValue, setPhoneNumberValue] = useState(`+${authUserData?.phone}`);
  // console.log('phoneNumberValue', phoneNumberValue);
  const [countryCode, setCountryCode] = useState('');

  let {
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
      full_name: authUserData?.full_name,
      email: authUserData?.email,
      biography: authUserData?.biography,
      address: authUserData?.address,
    },

    validate: {
      full_name: hasLength({ min: 8 }, 'Too short'),
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
    },
  });

  const [isInvalidFields, setIsInvalidFields] = useState({
    phone: false,
    state: false,
    city: false,
  });

  useEffect(() => {
    if (isAuthUserSuccess) {
      setCountryCode(authUserData.country_code);
      // setStateId(authUserData.state_id);
      // setCityId(authUserData.city_id);

      setVisibleOverlay(false);
      console.log('authUserData success', authUserData);
      console.log('store in details : ', store.getState());

      // setScrollLocked(false);
    }
  }, [isAuthUserSuccess, authUserData]);

  useEffect(() => {
    if (isStatesSuccess) {
      setStateId(authUserData.state_id);
      // setScrollLocked(false);
      if (states.length == 0) {
        states = '';
      }
    }
  }, [isStatesSuccess, states]);

  useEffect(() => {
    if (isCitiesSuccess) {
      setCityId(authUserData.city_id);
      // setScrollLocked(false);
    }
  }, [isCitiesSuccess, cities]);

  const validateOtherFields = (values) => {
    let hasNotValidValues = false;
    let state_id = '';
    let city_id = '';
    let phone = '';

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

    if (hasNotValidValues) {
      return null;
    }

    values['country_code'] = countryCode;

    return { ...values, state_id, city_id, phone };
  };

  const onSubmitHandle = (values) => {
    values = validateOtherFields(values);

    if (!values) return;
    // register(values);
    // console.log(values);

    // showLoadingNotification({
    //   id: 'register',
    //   title: 'Processing...',
    //   message: 'we are creating your student account',
    // });
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
          Personal Information
        </Title>
        {/* <Text fz={14} fw={700} sx={(theme) => ({ color: theme.colors.red[5] })}>
          {registerError?.errors}
        </Text> */}
        <Box className={classes.container}>
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
            label="Address"
            name="address"
            required
            icon={<ImLocation2 size={16} style={{ opacity: 0.9 }} />}
            placeholder="Your address"
            {...form.getInputProps('address')}
          />
          <Textarea
            label="Biography"
            id="biography"
            name="biography"
            sx={inputStyles}
            placeholder="write about yourself"
            autosize
            minRows={4}
            maxRows={4}
            {...form.getInputProps('biography')}
          />

          <Flex justify="end" align="center" w="100%" mt={24} maw={350}>
            <Button type="submit">SAVE CHANGES</Button>
          </Flex>
        </Box>
      </Paper>
    </form>
  );
}

export default PersonalDetails;
