import { createApi } from '@reduxjs/toolkit/query/react';

import baseQuery from '@/api/baseQuery';

// query
import getTest from './getTest';
import getAuthUser from './getAuthUser';
import getStates from './getStates';
import getCities from './getCities';
import successfullyVerifiedEmail from './successfullyVerifiedEmail';
import getUserAvatar from './getUserAvatar';
import confirmPasswordStatus from './confirmPasswordStatus';

// mutate
import login from './login';
import logout from './logout';
import register from './register';
import updateUser from './updateUser';
import updatePassword from './updatePassword';
import forgetPassword from './forgetPassword';
import resetPassword from './resetPassword';
import unverifyEmailNotification from './unverifyEmailNotification';
import deleteOtherSessionRecords from './deleteOtherSessionRecords';
import confirmPassword from './confirmPassword';
import postTest from './postTest';

// Define a service using a base URL and expected endpoints
export const authApi = createApi({
  baseQuery,
  reducerPath: 'auth',
  tagTypes: ['Auth', 'Image'],
  endpoints: (builder) => ({
    // query
    getTest: getTest(builder),
    getAuthUser: getAuthUser(builder),
    getStates: getStates(builder),
    getCities: getCities(builder),
    successfullyVerifiedEmail: successfullyVerifiedEmail(builder),
    getUserAvatar: getUserAvatar(builder),
    confirmPasswordStatus: confirmPasswordStatus(builder),

    // mutation
    register: register(builder),
    login: login(builder),
    logout: logout(builder),
    updateUser: updateUser(builder),
    updatePassword: updatePassword(builder),
    forgetPassword: forgetPassword(builder),
    resetPassword: resetPassword(builder),
    unverifyEmailNotification: unverifyEmailNotification(builder),
    deleteOtherSessionRecords: deleteOtherSessionRecords(builder),
    confirmPassword: confirmPassword(builder),
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
  useGetUserAvatarQuery,
  useConfirmPasswordStatusQuery,
  // mutattion
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useUpdateUserMutation,
  useUpdatePasswordMutation,
  useForgetPasswordMutation,
  useResetPasswordMutation,
  useUnverifyEmailNotificationMutation,
  useDeleteOtherSessionRecordsMutation,
  usePostTestMutation,
  useConfirmPasswordMutation,
} = authApi;
