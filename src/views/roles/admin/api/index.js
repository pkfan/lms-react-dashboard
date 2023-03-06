import { createApi } from '@reduxjs/toolkit/query/react';

import baseQuery from '@/api/baseQuery';

// query
import getTest from './getTest';
import getCategory from './category/getCategory';
import getCategories from './category/getCategories';
import getSubCategories from './category/getSubCategories';
import getCategoryThumbnail from './category/getCategoryThumbnail';

// mutate
import postTest from './postTest';
import createCategory from './category/createCategory';
import updateCategory from './category/updateCategory';
import createSubCategory from './category/createSubCategory';
import deleteSubCategory from './category/deleteSubCategory';
import insertCategoryThumbnail from './category/insertCategoryThumbnail';

// Define a service using a base URL and expected endpoints
export const adminApi = createApi({
  baseQuery,
  reducerPath: 'admin',
  tagTypes: ['Admin', 'Category'],
  endpoints: (builder) => ({
    // query
    getTest: getTest(builder),
    getCategory: getCategory(builder),
    getSubCategories: getSubCategories(builder),
    getCategoryThumbnail: getCategoryThumbnail(builder),
    getCategories: getCategories(builder),

    // mutation
    postTest: postTest(builder),
    createCategory: createCategory(builder),
    updateCategory: updateCategory(builder),
    createSubCategory: createSubCategory(builder),
    deleteSubCategory: deleteSubCategory(builder),
    insertCategoryThumbnail: insertCategoryThumbnail(builder),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  // query
  useGetTestQuery,
  useGetCategoryQuery,
  useGetSubCategoriesQuery,
  useGetCategoryThumbnailQuery,
  useGetCategoriesQuery,

  // mutattion

  usePostTestMutation,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useCreateSubCategoryMutation,
  useDeleteSubCategoryMutation,
  useInsertCategoryThumbnailMutation,
} = adminApi;
