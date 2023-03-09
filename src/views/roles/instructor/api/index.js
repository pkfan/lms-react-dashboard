import { createApi } from '@reduxjs/toolkit/query/react';

import baseQuery from '@/api/baseQuery';

// query
import getCategoriesWithSubCategories from './category/getCategoriesWithSubCategories';
import { getCourses, getCourse } from './course';

import {
  getCourseSteps,
  getDescription,
  getThumbnail,
  getCover,
  toggleStep,
  createBasic,
  updateBasic,
  insertDescription,
  insertRequirements,
  insertOutcomes,
  insertFaq,
  insertFeatures,
  insertThumbnail,
  insertCover,
  insertSeo,
} from './course-steps';

import {
  createChapter,
  getChapter,
  getChapters,
  updateChapter,
  updateChapterVisibility,
  deleteChapter,
} from './chapter';

// Define a service using a base URL and expected endpoints
export const instructorApi = createApi({
  baseQuery,
  reducerPath: 'instructor',
  tagTypes: ['Instructor', 'Course'],
  endpoints: (builder) => ({
    // query
    getCategoriesWithSubCategories: getCategoriesWithSubCategories(builder),
    getCourseSteps: getCourseSteps(builder),
    getDescription: getDescription(builder),
    getThumbnail: getThumbnail(builder),
    getCover: getCover(builder),
    getCourse: getCourse(builder),
    getCourses: getCourses(builder),
    getChapter: getChapter(builder),
    getChapters: getChapters(builder),

    // mutation
    createBasic: createBasic(builder),
    updateBasic: updateBasic(builder),
    insertDescription: insertDescription(builder),
    toggleStep: toggleStep(builder),
    insertRequirements: insertRequirements(builder),
    insertOutcomes: insertOutcomes(builder),
    insertFaq: insertFaq(builder),
    insertFeatures: insertFeatures(builder),
    insertThumbnail: insertThumbnail(builder),
    insertCover: insertCover(builder),
    insertSeo: insertSeo(builder),
    createChapter: createChapter(builder),
    updateChapter: updateChapter(builder),
    updateChapterVisibility: updateChapterVisibility(builder),
    deleteChapter: deleteChapter(builder),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  // query
  useGetCategoriesWithSubCategoriesQuery,
  useGetCourseStepsQuery,
  useGetDescriptionQuery,
  useGetThumbnailQuery,
  useGetCoverQuery,
  useGetCourseQuery,
  useGetCoursesQuery,
  useGetChapterQuery,
  useGetChaptersQuery,

  // mutattion
  useCreateBasicMutation,
  useUpdateBasicMutation,
  useInsertDescriptionMutation,
  useToggleStepMutation,
  useInsertRequirementsMutation,
  useInsertOutcomesMutation,
  useInsertFaqMutation,
  useInsertFeaturesMutation,
  useInsertThumbnailMutation,
  useInsertCoverMutation,
  useInsertSeoMutation,
  useCreateChapterMutation,
  useUpdateChapterMutation,
  useUpdateChapterVisibilityMutation,
  useDeleteChapterMutation,
} = instructorApi;
