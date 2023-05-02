import createResponseErrors from '@/helpers/createResponseErrors';

export function deleteBulkCoursesPermanent(builder) {
  const deleteBulkCoursesPermanentQuery = builder.mutation({
    query: (data) => ({
      url: `/instructor/courses/bulk/delete-permanent`,
      method: 'POST',
      data,
    }),
    transformResponse: (response) => {
      console.log('deleteBulkCoursesPermanentQuery response', response);
      return response.data;
    },
    transformErrorResponse: (response) => {
      console.log('deleteBulkCoursesPermanentQuery errors response', response);

      return createResponseErrors(response);
    },
    invalidatesTags: ['Course'],
  });

  return deleteBulkCoursesPermanentQuery;
}

export default deleteBulkCoursesPermanent;
