import { createApi } from '@reduxjs/toolkit/query/react';

import baseQuery from '@/api/baseQuery';

// query
import getImages from './getImages';

// mutate
// import postTest from './postTest';

// Define a service using a base URL and expected endpoints
export const baseApi = createApi({
  baseQuery,
  reducerPath: 'base',
  tagTypes: ['Base'],
  endpoints: (builder) => ({
    // query
    getImages: getImages(builder),

    // mutation
    // postTest: postTest(builder),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  // query
  useGetImagesQuery,

  // mutattion
  // usePostTestMutation,
} = baseApi;
