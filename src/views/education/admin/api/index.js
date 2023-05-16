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

import {
  createCategory,
  createSubCategory,
  updateSubCategory,
  deleteCategory,
  deleteBulkCategory,
  deleteSubCategory,
  deleteBulkSubCategory,
  getCategories,
  getCategory,
  getCategoryCount,
  getCategoryThumbnail,
  getSubCategory,
  getSubCategories,
  getSubCategoryCount,
  insertCategoryThumbnail,
  updateCategory,
} from './category';

// query
import getTest from './getTest';

// mutate
import postTest from './postTest';

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
    getSubCategory: getSubCategory(builder),
    getCategoryThumbnail: getCategoryThumbnail(builder),
    getCategories: getCategories(builder),
    getCategoryCount: getCategoryCount(builder),
    getSubCategoryCount: getSubCategoryCount(builder),

    getCourses: getCourses(builder),
    getCoursesCount: getCoursesCount(builder),
    getTrashCoursesCount: getTrashCoursesCount(builder),

    getInstructors: getInstructors(builder),

    // mutation
    courseAction: courseAction(builder),
    deleteCourse: deleteCourse(builder),
    coursesBulkAction: coursesBulkAction(builder),
    deleteBulkCourses: deleteBulkCourses(builder),
    deleteBulkCoursesPermanent: deleteBulkCoursesPermanent(builder),
    deleteCoursePermanent: deleteCoursePermanent(builder),
    restoreTrashCourse: restoreTrashCourse(builder),
    restoreBulkTrashCourses: restoreBulkTrashCourses(builder),

    postTest: postTest(builder),
    createCategory: createCategory(builder),
    updateCategory: updateCategory(builder),
    deleteCategory: deleteCategory(builder),
    deleteBulkCategory: deleteBulkCategory(builder),
    createSubCategory: createSubCategory(builder),
    updateSubCategory: updateSubCategory(builder),
    deleteSubCategory: deleteSubCategory(builder),
    deleteBulkSubCategory: deleteBulkSubCategory(builder),
    insertCategoryThumbnail: insertCategoryThumbnail(builder),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  // query
  useGetCoursesQuery,
  useGetCoursesCountQuery,
  useGetTrashCoursesCountQuery,

  useGetTestQuery,
  useGetCategoryQuery,
  useGetSubCategoriesQuery,
  useGetSubCategoryQuery,
  useGetCategoryThumbnailQuery,
  useGetCategoriesQuery,
  useGetInstructorsQuery,
  useGetCategoryCountQuery,
  useGetSubCategoryCountQuery,

  // mutattion
  useCourseActionMutation,
  useDeleteCourseMutation,
  useCoursesBulkActionMutation,
  useDeleteBulkCoursesMutation,
  useDeleteBulkCoursesPermanentMutation,
  useDeleteCoursePermanentMutation,
  useRestoreTrashCourseMutation,
  useRestoreBulkTrashCoursesMutation,

  usePostTestMutation,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useDeleteBulkCategoryMutation,
  useCreateSubCategoryMutation,
  useUpdateSubCategoryMutation,
  useDeleteSubCategoryMutation,
  useDeleteBulkSubCategoryMutation,
  useInsertCategoryThumbnailMutation,
} = adminApi;
