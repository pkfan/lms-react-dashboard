import createResponseErrors from '@/helpers/createResponseErrors';

export function restoreTrashCourse(builder) {
  const restoreTrashCourseQuery = builder.mutation({
    query: (data) => ({
      url: `/instructor/course/restore-trash`,
      method: 'POST',
      data,
    }),
    transformResponse: (response) => {
      console.log('restoreTrashCourseQuery response', response);
      return response.data;
    },
    transformErrorResponse: (response) => {
      console.log('restoreTrashCourseQuery errors response', response);

      return createResponseErrors(response);
    },
    invalidatesTags: ['Course'],
  });

  return restoreTrashCourseQuery;
}

export default restoreTrashCourse;
