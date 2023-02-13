import { createApi } from '@reduxjs/toolkit/query/react';

import baseQuery from '@/api/baseQuery';

import login from './login';
import register from './register';
import getAuthUser from './getAuthUser';
import getStates from './getStates';
import getCities from './getCities';
import updateUser from './updateUser';
import updatePassword from './updatePassword';
import forgetPassword from './forgetPassword';
import resetPassword from './resetPassword';
import successfullyVerifiedEmail from './successfullyVerifiedEmail';
import unverifyEmailNotification from './unverifyEmailNotification';

// Define a service using a base URL and expected endpoints
export const authApi = createApi({
  baseQuery,
  reducerPath: 'auth',
  tagTypes: ['Auth'],
  endpoints: (builder) => ({
    // query
    getAuthUser: getAuthUser(builder),
    getStates: getStates(builder),
    getCities: getCities(builder),
    successfullyVerifiedEmail: successfullyVerifiedEmail(builder),

    // mutation
    register: register(builder),
    login: login(builder),
    updateUser: updateUser(builder),
    updatePassword: updatePassword(builder),
    forgetPassword: forgetPassword(builder),
    resetPassword: resetPassword(builder),
    unverifyEmailNotification: unverifyEmailNotification(builder),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  // query
  useGetAuthUserQuery,
  useGetStatesQuery,
  useGetCitiesQuery,
  useSuccessfullyVerifiedEmailQuery,
  // mutattion
  useLoginMutation,
  useRegisterMutation,
  useUpdateUserMutation,
  useUpdatePasswordMutation,
  useForgetPasswordMutation,
  useResetPasswordMutation,
  useUnverifyEmailNotificationMutation,
} = authApi;
