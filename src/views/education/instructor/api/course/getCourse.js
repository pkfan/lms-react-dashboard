import createResponseErrors from '@/helpers/createResponseErrors';

export default function getCourse(builder) {
  const getCourseQuery = builder.query({
    query: (courseId) => {
      if (!courseId) {
        throw new Error('skip request on null. [pkfan error]');
      }
      return {
        url: `/instructor/course/${courseId}`,
        method: 'GET',
      };
    },
    transformResponse: (response) => {
      console.log('getCourseQuery response', response);
      return response.data;
    },
    transformErrorResponse: (response) => {
      return createResponseErrors(response);
    },
    // providesTags: ['Course'],
  });

  return getCourseQuery;
}
