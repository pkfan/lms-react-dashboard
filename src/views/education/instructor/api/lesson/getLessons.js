import createResponseErrors from '@/helpers/createResponseErrors';

export function getLessons(builder) {
  const getLessonsQuery = builder.query({
    query: (chapterId) => {
      if (!chapterId) {
        throw new Error('skip request on null. [pkfan error]');
      }
      return {
        url: `/instructor/course/lessons/${chapterId}`,
        method: 'GET',
      };
    },
    transformResponse: (response) => {
      console.log('getLessonsQuery response', response);
      return response.data;
    },
    transformErrorResponse: (response) => {
      return createResponseErrors(response);
    },
    providesTags: ['Lesson'],
  });

  return getLessonsQuery;
}

export default getLessons;
