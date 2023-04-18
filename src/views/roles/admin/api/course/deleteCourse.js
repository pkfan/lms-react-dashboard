import createResponseErrors from '@/helpers/createResponseErrors';

export function deleteCourse(builder) {
  const deleteCourseQuery = builder.mutation({
    query: (data) => ({
      url: `/admin/course/delete`,
      method: 'POST',
      data,
    }),
    transformResponse: (response) => {
      console.log('deleteCourseQuery response', response);
      return response.data;
    },
    transformErrorResponse: (response) => {
      console.log('deleteCourseQuery errors response', response);

      return createResponseErrors(response);
    },
    invalidatesTags: ['Course'],
  });

  return deleteCourseQuery;
}

export default deleteCourse;
