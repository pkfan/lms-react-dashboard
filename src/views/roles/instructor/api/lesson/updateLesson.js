import createResponseErrors from '@/helpers/createResponseErrors';

export function updateLesson(builder) {
  const updateLessonQuery = builder.mutation({
    query: (data) => ({
      url: `/instructor/course/lesson/update`,
      method: 'POST',
      data,
    }),
    transformResponse: (response) => {
      console.log('updateLessonQuery response', response);
      return response.data;
    },
    transformErrorResponse: (response) => {
      console.log('updateLessonQuery errors response', response);

      return createResponseErrors(response);
    },
    invalidatesTags: ['Lesson'],
  });

  return updateLessonQuery;
}

export default updateLesson;
