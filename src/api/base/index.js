import { createApi } from '@reduxjs/toolkit/query/react';

import baseQuery from '@/api/baseQuery';

// query
import getImages from './getImages';
import getImage from './getImage';
import getCoursesTest from './getCoursesTest';

// mutate
// import postTest from './postTest';

// Define a service using a base URL and expected endpoints
export const baseApi = createApi({
  baseQuery,
  reducerPath: 'base',
  tagTypes: ['Base', 'Image'],
  endpoints: (builder) => ({
    // query
    getImages: getImages(builder),
    getImage: getImage(builder),
    getCoursesTest: getCoursesTest(builder),

    // mutation
    // postTest: postTest(builder),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  // query
  useGetImagesQuery,
  useGetImageQuery,
  useGetCoursesTestQuery,

  // mutattion
  // usePostTestMutation,
} = baseApi;
