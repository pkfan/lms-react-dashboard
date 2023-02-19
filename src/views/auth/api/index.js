import { createApi } from '@reduxjs/toolkit/query/react';

import baseQuery from '@/api/baseQuery';

import getTest from './getTest';
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
import deleteOtherSessionRecords from './deleteOtherSessionRecords';
import postTest from './postTest';
// Define a service using a base URL and expected endpoints
export const authApi = createApi({
  baseQuery,
  reducerPath: 'auth',
  tagTypes: ['Auth'],
  endpoints: (builder) => ({
    // query
    getTest: getTest(builder),
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
    deleteOtherSessionRecords: deleteOtherSessionRecords(builder),
    postTest: postTest(builder),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  // query
  useGetTestQuery,
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
  useDeleteOtherSessionRecordsMutation,
  usePostTestMutation,
} = authApi;
