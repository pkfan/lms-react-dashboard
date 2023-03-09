import createResponseErrors from '@/helpers/createResponseErrors';

export default function getCourses(builder) {
  const getCoursesQuery = builder.query({
    query: () => ({
      url: `/instructor/courses`,
      method: 'GET',
    }),
    // Pick out data and prevent nested properties in a hook or selector
    transformResponse: (response) => {
      console.log('getCoursesQuery response', response);
      return response.data;
    },
    // Pick out errors and prevent nested properties in a hook or selector
    transformErrorResponse: (response) => {
      return createResponseErrors(response);
    },
    // The 2nd parameter is the destructured `QueryLifecycleApi`
  });

  return getCoursesQuery;
}
