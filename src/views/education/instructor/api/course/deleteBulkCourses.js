import createResponseErrors from '@/helpers/createResponseErrors';

export function deleteBulkCourses(builder) {
  const deleteBulkCoursesQuery = builder.mutation({
    query: (data) => ({
      url: `/instructor/courses/bulk/delete`,
      method: 'POST',
      data,
    }),
    transformResponse: (response) => {
      console.log('deleteBulkCoursesQuery response', response);
      return response.data;
    },
    transformErrorResponse: (response) => {
      console.log('deleteBulkCoursesQuery errors response', response);

      return createResponseErrors(response);
    },
    invalidatesTags: ['Course'],
  });

  return deleteBulkCoursesQuery;
}

export default deleteBulkCourses;
