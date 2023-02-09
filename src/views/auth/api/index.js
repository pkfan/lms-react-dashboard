import { createApi } from '@reduxjs/toolkit/query/react';

import baseQuery from '@/api/baseQuery';

import login from './login';
import getAuthUser from './getAuthUser';
// import getJob from './getJob';
// import getJobs from './getJobs';

// Define a service using a base URL and expected endpoints
export const authApi = createApi({
  baseQuery,
  reducerPath: 'auth',
  tagTypes: ['Auth'],
  endpoints: (builder) => ({
    // getJobs: getJobs(builder),
    getAuthUser: getAuthUser(builder),

    login: login(builder),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAuthUserQuery, useLoginMutation } = authApi;
