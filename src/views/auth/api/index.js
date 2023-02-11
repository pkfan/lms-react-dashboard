import { createApi } from '@reduxjs/toolkit/query/react';

import baseQuery from '@/api/baseQuery';

import login from './login';
import register from './register';
import getAuthUser from './getAuthUser';
import getStates from './getStates';
import getCities from './getCities';

// Define a service using a base URL and expected endpoints
export const authApi = createApi({
  baseQuery,
  reducerPath: 'auth',
  tagTypes: ['Auth'],
  endpoints: (builder) => ({
    // getJobs: getJobs(builder),
    getAuthUser: getAuthUser(builder),
    getStates: getStates(builder),
    getCities: getCities(builder),

    register: register(builder),
    login: login(builder),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetAuthUserQuery,
  useGetStatesQuery,
  useGetCitiesQuery,
  useLoginMutation,
  useRegisterMutation,
} = authApi;
