import { createApi } from '@reduxjs/toolkit/query/react';

import baseQuery from '@/api/baseQuery';

import getJob from './getJob';
import getJobs from './getJobs';

// Define a service using a base URL and expected endpoints
export const jobsApi = createApi({
  baseQuery,
  reducerPath: 'jobsApi',
  endpoints: (builder) => ({
    getJobs: getJobs(builder),
    getJob: getJob(builder),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetJobsQuery, useGetJobQuery } = jobsApi;
