import { createApi } from '@reduxjs/toolkit/query/react';
import baseQuery from '@/api/baseQuery';

// query
import getInstructors from './getInstructors';
import setCourseInstructors from './setCourseInstructors';

import getCategoriesWithSubCategories from './category/getCategoriesWithSubCategories';
import {
  getCourse,
  getInvitesCourses,
  updateInviteCourse,
  ////
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
    getCourseSteps: getCourseSteps(builder),
    getCourse: getCourse(builder),
    getInvitesCourses: getInvitesCourses(builder),

    getCourses: getCourses(builder),
    getCoursesCount: getCoursesCount(builder),
    getTrashCoursesCount: getTrashCoursesCount(builder),

    getCategoriesWithSubCategories: getCategoriesWithSubCategories(builder),
    getDescription: getDescription(builder),
    getThumbnail: getThumbnail(builder),
    getCover: getCover(builder),
    getChapter: getChapter(builder),
    getChapters: getChapters(builder),
    getLessons: getLessons(builder),
    getAttachments: getAttachments(builder),
    getInstructors: getInstructors(builder),

    // mutation
    setCourseInstructors: setCourseInstructors(builder),
    updateInviteCourse: updateInviteCourse(builder),

    courseAction: courseAction(builder),
    deleteCourse: deleteCourse(builder),
    coursesBulkAction: coursesBulkAction(builder),
    deleteBulkCourses: deleteBulkCourses(builder),
    deleteBulkCoursesPermanent: deleteBulkCoursesPermanent(builder),
    deleteCoursePermanent: deleteCoursePermanent(builder),
    restoreTrashCourse: restoreTrashCourse(builder),
    restoreBulkTrashCourses: restoreBulkTrashCourses(builder),

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
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetCourseStepsQuery,
  useGetCourseQuery,
  useGetInvitesCoursesQuery,

  useGetCoursesQuery,
  useGetCoursesCountQuery,
  useGetTrashCoursesCountQuery,

  // query
  useGetCategoriesWithSubCategoriesQuery,
  useGetDescriptionQuery,
  useGetThumbnailQuery,
  useGetCoverQuery,
  useGetChapterQuery,
  useGetChaptersQuery,
  useGetLessonsQuery,
  useGetAttachmentsQuery,
  useGetInstructorsQuery,

  // mutattion
  useSetCourseInstructorsMutation,
  useUpdateInviteCourseMutation,

  useCourseActionMutation,
  useDeleteCourseMutation,
  useCoursesBulkActionMutation,
  useDeleteBulkCoursesMutation,
  useDeleteBulkCoursesPermanentMutation,
  useDeleteCoursePermanentMutation,
  useRestoreTrashCourseMutation,
  useRestoreBulkTrashCoursesMutation,

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
} = instructorApi;
