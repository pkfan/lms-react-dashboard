import createResponseErrors from '@/helpers/createResponseErrors';

export function restoreBulkTrashCourses(builder) {
  const restoreBulkTrashCoursesQuery = builder.mutation({
    query: (data) => ({
      url: `/admin/courses/bulk/restore-trash`,
      method: 'POST',
      data,
    }),
    transformResponse: (response) => {
      console.log('restoreBulkTrashCoursesQuery response', response);
      return response.data;
    },
    transformErrorResponse: (response) => {
      console.log('restoreBulkTrashCoursesQuery errors response', response);

      return createResponseErrors(response);
    },
    invalidatesTags: ['Course'],
  });

  return restoreBulkTrashCoursesQuery;
}

export default restoreBulkTrashCourses;
