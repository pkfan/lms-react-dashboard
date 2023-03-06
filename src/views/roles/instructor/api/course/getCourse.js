import createResponseErrors from '@/helpers/createResponseErrors';

export default function getCourse(builder) {
  const getCourseQuery = builder.query({
    query: (courseId) => ({
      url: `/instructor/course/${courseId}`,
      method: 'GET',
    }),
    // Pick out data and prevent nested properties in a hook or selector
    transformResponse: (response) => {
      console.log('getCourseQuery response', response);
      return response.data;
    },
    // Pick out errors and prevent nested properties in a hook or selector
    transformErrorResponse: (response) => {
      return createResponseErrors(response);
    },
    // The 2nd parameter is the destructured `QueryLifecycleApi`
  });

  return getCourseQuery;
}
