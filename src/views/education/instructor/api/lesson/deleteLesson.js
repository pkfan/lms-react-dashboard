import createResponseErrors from '@/helpers/createResponseErrors';

export function deleteLesson(builder) {
  const deleteLessonQuery = builder.mutation({
    query: (data) => ({
      url: `/instructor/course/lesson/delete`,
      method: 'POST',
      data,
    }),
    transformResponse: (response) => {
      console.log('deleteLessonQuery response', response);
      return response.data;
    },
    transformErrorResponse: (response) => {
      console.log('deleteLessonQuery errors response', response);

      return createResponseErrors(response);
    },
    invalidatesTags: ['Lesson'],
  });

  return deleteLessonQuery;
}

export default deleteLesson;
