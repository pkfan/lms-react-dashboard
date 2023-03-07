import createResponseErrors from '@/helpers/createResponseErrors';

export function getChapters(builder) {
  const getChaptersQuery = builder.query({
    query: (courseId) => ({
      url: `/instructor/course/chapters/${courseId}`,
      method: 'GET',
    }),
    // Pick out data and prevent nested properties in a hook or selector
    transformResponse: (response) => {
      console.log('getChaptersQuery response', response);
      return response.data;
    },
    // Pick out errors and prevent nested properties in a hook or selector
    transformErrorResponse: (response) => {
      return createResponseErrors(response);
    },
    // The 2nd parameter is the destructured `QueryLifecycleApi`
  });

  return getChaptersQuery;
}

export default getChapters;
