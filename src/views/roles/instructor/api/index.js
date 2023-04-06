import { createApi } from '@reduxjs/toolkit/query/react';
import baseQuery from '@/api/baseQuery';

// query
import getInstructors from './getInstructors';
import setCourseInstructors from './setCourseInstructors';

import getCategoriesWithSubCategories from './category/getCategoriesWithSubCategories';
import {
  getCourses,
  getCourse,
  getCoursesWithDetail,
  deleteCourse,
  getInvitesCourses,
  updateInviteCourse,
  getTrashCourses,
  restoreTrashCourse,
} from './course';

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

import { getLessons, updateLesson, deleteLesson, sortLessons } from './lesson';
import { getAttachments, updateAttachment, deleteAttachment, sortAttachments } from './attachment';

// Define a service using a base URL and expected endpoints
export const instructorApi = createApi({
  baseQuery,
  reducerPath: 'instructor',
  tagTypes: [
    'Instructor',
    'Course',
    'Category',
    'Chapter',
    'Image',
    'CourseSteps',
    'Lesson',
    'Attachment',
  ],
  endpoints: (builder) => ({
    // query
    getCategoriesWithSubCategories: getCategoriesWithSubCategories(builder),
    getCourseSteps: getCourseSteps(builder),
    getDescription: getDescription(builder),
    getThumbnail: getThumbnail(builder),
    getCover: getCover(builder),
    getCourse: getCourse(builder),
    getCourses: getCourses(builder),
    getCoursesWithDetail: getCoursesWithDetail(builder),
    getChapter: getChapter(builder),
    getChapters: getChapters(builder),
    getLessons: getLessons(builder),
    getAttachments: getAttachments(builder),
    getInstructors: getInstructors(builder),
    getInvitesCourses: getInvitesCourses(builder),
    getTrashCourses: getTrashCourses(builder),

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
    updateLesson: updateLesson(builder),
    deleteLesson: deleteLesson(builder),
    sortLessons: sortLessons(builder),
    updateAttachment: updateAttachment(builder),
    deleteAttachment: deleteAttachment(builder),
    sortAttachments: sortAttachments(builder),
    setCourseInstructors: setCourseInstructors(builder),
    deleteCourse: deleteCourse(builder),
    updateInviteCourse: updateInviteCourse(builder),
    restoreTrashCourse: restoreTrashCourse(builder),
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
  useGetCoursesWithDetailQuery,
  useGetChapterQuery,
  useGetChaptersQuery,
  useGetLessonsQuery,
  useGetAttachmentsQuery,
  useGetInstructorsQuery,
  useGetInvitesCoursesQuery,
  useGetTrashCoursesQuery,

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
  useUpdateLessonMutation,
  useDeleteLessonMutation,
  useSortLessonsMutation,
  useUpdateAttachmentMutation,
  useDeleteAttachmentMutation,
  useSortAttachmentsMutation,
  useSetCourseInstructorsMutation,
  useDeleteCourseMutation,
  useUpdateInviteCourseMutation,
  useRestoreTrashCourseMutation,
} = instructorApi;
