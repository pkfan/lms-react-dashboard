import createResponseErrors from '@/helpers/createResponseErrors';

export function getChapter(builder) {
  const getChapterQuery = builder.query({
    query: (chapterId) => ({
      url: `/instructor/course/chapter/${chapterId}`,
      method: 'GET',
    }),
    transformResponse: (response) => {
      console.log('getChapterQuery response', response);
      return response.data;
    },
    transformErrorResponse: (response) => {
      return createResponseErrors(response);
    },
    providesTags: ['Chapter'],
  });

  return getChapterQuery;
}

export default getChapter;
