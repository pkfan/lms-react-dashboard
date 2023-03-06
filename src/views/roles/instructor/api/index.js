import { createApi } from '@reduxjs/toolkit/query/react';

import baseQuery from '@/api/baseQuery';

// query
import getCategoriesWithSubCategories from './category/getCategoriesWithSubCategories';
import getCourseSteps from './course-steps/getCourseSteps';
import getDescription from './course-steps/getDescription';
import getThumbnail from './course-steps/getThumbnail';
import getCover from './course-steps/getCover';
import getCourse from './course/getCourse';

// mutate
import toggleStep from './course-steps/toggleStep';
import createBasic from './course-steps/createBasic';
import updateBasic from './course-steps/updateBasic';
import insertDescription from './course-steps/insertDescription';
import insertRequirements from './course-steps/insertRequirements';
import insertOutcomes from './course-steps/insertOutcomes';
import insertFaq from './course-steps/insertFaq';
import insertFeatures from './course-steps/insertFeatures';
import insertThumbnail from './course-steps/insertThumbnail';
import insertCover from './course-steps/insertCover';

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
} = instructorApi;
