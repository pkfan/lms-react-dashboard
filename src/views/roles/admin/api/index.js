import { createApi } from '@reduxjs/toolkit/query/react';

import baseQuery from '@/api/baseQuery';

import getInstructors from './getInstructors';
import {
  getCourses,
  courseAction,
  getCoursesCount,
  deleteCourse,
  coursesBulkAction,
  deleteBulkCourses,
  deleteCoursePermanent,
  deleteBulkCoursesPermanent,
  getTrashCoursesCount,
  restoreTrashCourse,
  restoreBulkTrashCourses,
} from './course';

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
import deleteCategory from './category/deleteCategory';
import createSubCategory from './category/createSubCategory';
import deleteSubCategory from './category/deleteSubCategory';
import insertCategoryThumbnail from './category/insertCategoryThumbnail';

// Define a service using a base URL and expected endpoints
export const adminApi = createApi({
  baseQuery,
  reducerPath: 'admin',
  tagTypes: ['Admin', 'Course', 'Category', 'Image'],
  endpoints: (builder) => ({
    // query
    getTest: getTest(builder),
    getCategory: getCategory(builder),
    getSubCategories: getSubCategories(builder),
    getCategoryThumbnail: getCategoryThumbnail(builder),
    getCategories: getCategories(builder),

    getCourses: getCourses(builder),
    getCoursesCount: getCoursesCount(builder),
    getTrashCoursesCount: getTrashCoursesCount(builder),
    getInstructors: getInstructors(builder),

    // mutation
    postTest: postTest(builder),
    createCategory: createCategory(builder),
    updateCategory: updateCategory(builder),
    deleteCategory: deleteCategory(builder),
    createSubCategory: createSubCategory(builder),
    deleteSubCategory: deleteSubCategory(builder),
    insertCategoryThumbnail: insertCategoryThumbnail(builder),
    courseAction: courseAction(builder),
    deleteCourse: deleteCourse(builder),
    coursesBulkAction: coursesBulkAction(builder),
    deleteBulkCourses: deleteBulkCourses(builder),
    deleteBulkCoursesPermanent: deleteBulkCoursesPermanent(builder),
    deleteCoursePermanent: deleteCoursePermanent(builder),
    restoreTrashCourse: restoreTrashCourse(builder),
    restoreBulkTrashCourses: restoreBulkTrashCourses(builder),
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

  useGetCoursesQuery,
  useGetCoursesCountQuery,
  useGetInstructorsQuery,
  useGetTrashCoursesCountQuery,

  // mutattion

  usePostTestMutation,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useCreateSubCategoryMutation,
  useDeleteSubCategoryMutation,
  useInsertCategoryThumbnailMutation,
  useCourseActionMutation,
  useDeleteCourseMutation,
  useCoursesBulkActionMutation,
  useDeleteBulkCoursesMutation,
  useDeleteBulkCoursesPermanentMutation,
  useDeleteCoursePermanentMutation,
  useRestoreTrashCourseMutation,
  useRestoreBulkTrashCoursesMutation,
} = adminApi;
