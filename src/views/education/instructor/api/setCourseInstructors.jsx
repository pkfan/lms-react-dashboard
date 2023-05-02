import createResponseErrors from '@/helpers/createResponseErrors';

export function setCourseInstructors(builder) {
  const setCourseInstructorsQuery = builder.mutation({
    query: (data) => ({
      url: `/instructor/course/instructors/sync`,
      method: 'POST',
      data,
    }),
    transformResponse: (response) => {
      console.log('setCourseInstructorsQuery response', response);
      return response.data;
    },
    transformErrorResponse: (response) => {
      console.log('setCourseInstructorsQuery errors response', response);

      return createResponseErrors(response);
    },
    invalidatesTags: ['Course'],
  });

  return setCourseInstructorsQuery;
}

export default setCourseInstructors;
