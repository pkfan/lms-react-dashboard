import createResponseErrors from '@/helpers/createResponseErrors';

export function getLessons(builder) {
  const getLessonsQuery = builder.query({
    query: (chapterId) => ({
      url: `/instructor/course/lessons/${chapterId}`,
      method: 'GET',
    }),
    // Pick out data and prevent nested properties in a hook or selector
    transformResponse: (response) => {
      console.log('getLessonsQuery response', response);
      return response.data;
    },
    // Pick out errors and prevent nested properties in a hook or selector
    transformErrorResponse: (response) => {
      return createResponseErrors(response);
    },
    // The 2nd parameter is the destructured `QueryLifecycleApi`
  });

  return getLessonsQuery;
}

export default getLessons;
