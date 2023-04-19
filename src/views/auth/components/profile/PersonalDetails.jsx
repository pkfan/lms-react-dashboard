import { useState, useEffect } from 'react';
import { createStyles, Flex, TextInput, Title, Box, Textarea } from '@mantine/core';
import { useForm, isEmail, hasLength } from '@mantine/form';
import {
  Alert,
  Paper,
  Button,
  PhoneNumberInput,
  CountrySelect,
  StatesSelect,
  CitySelect,
} from '@/components';

import {
  showLoadingNotification,
  updateLoadingNotificationError,
  updateLoadingNotificationSuccess,
} from '@/helpers/notification';

import { FaUser, FaPhone, MdEmail, ImLocation2 } from '@/components/icons';

import {
  useGetStatesQuery,
  useGetCitiesQuery,
  useGetAuthUserQuery,
  useUpdateUserMutation,
} from '@/views/auth/api';

import { inputStyles } from '@/styles';
import { getAllCountries } from 'user-detail-from-browser';

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

export function PersonalDetails({ setVisibleOverlay }) {
  const { classes } = useStyles();
  const {
    data: authUserData,
    refetch: authUserRefetch,
    isSuccess: isAuthUserSuccess,
  } = useGetAuthUserQuery();
  const [
    updateUser,
    {
      error: updateUserError,
      isSuccess: isUpdateUserSuccess,
      isLoading: isUpdateUserLoading,
      isError: isUpdateUserError,
    },
  ] = useUpdateUserMutation();

  // console.log('authUserData', authUserData);

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
      biography: authUserData?.biography || '',
      address: authUserData?.address,
    },

    validate: {
      full_name: hasLength({ min: 4 }, 'Too short'),
      email: isEmail('Invalid email'),
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
      // console.log('authUserData success', authUserData);
      // console.log('store in details : ', store.getState());

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

  useEffect(() => {
    if (isUpdateUserSuccess) {
      updateLoadingNotificationSuccess({
        id: 'updateProfile',
        message: 'Personal Information updated successfully',
        time: 6000,
      });
      authUserRefetch();
    }
    if (isUpdateUserError) {
      updateLoadingNotificationError({
        id: 'updateProfile',
        message: 'Errors in Personal Information',
        time: 3000,
      });
    }
  }, [isUpdateUserSuccess, isUpdateUserError]);

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
    console.log('before updateUser : ', values);
    values = validateOtherFields(values);

    if (!values) return;
    updateUser(values);
    console.log('after updateUser : ', values);

    showLoadingNotification({
      id: 'updateProfile',
      title: 'Updating Profile Information...',
      message: 'we are updating your account infromation',
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
          Personal Information
        </Title>

        <Box className={classes.container}>
          {isUpdateUserError && (
            <Alert title="Errors!" color="red" errors={updateUserError?.errors} />
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
            <Button type="submit" loading={isUpdateUserLoading}>
              SAVE CHANGES
            </Button>
          </Flex>
        </Box>
      </Paper>
    </form>
  );
}

export default PersonalDetails;
