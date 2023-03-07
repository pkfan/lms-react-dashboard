import createResponseErrors from '@/helpers/createResponseErrors';

export function getChapter(builder) {
  const getChapterQuery = builder.query({
    query: (chapterId) => ({
      url: `/instructor/course/chapter/${chapterId}`,
      method: 'GET',
    }),
    // Pick out data and prevent nested properties in a hook or selector
    transformResponse: (response) => {
      console.log('getChapterQuery response', response);
      return response.data;
    },
    // Pick out errors and prevent nested properties in a hook or selector
    transformErrorResponse: (response) => {
      return createResponseErrors(response);
    },
    // The 2nd parameter is the destructured `QueryLifecycleApi`
  });

  return getChapterQuery;
}

export default getChapter;
