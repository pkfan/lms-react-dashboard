import createResponseErrors from '@/helpers/createResponseErrors';

export function createChapter(builder) {
  const createChapterQuery = builder.mutation({
    query: (data) => ({
      url: `/instructor/course/chapter/create`,
      method: 'POST',
      data,
    }),
    transformResponse: (response) => {
      console.log('createChapterQuery response', response);
      return response.data;
    },
    transformErrorResponse: (response) => {
      console.log('createChapterQuery errors response', response);

      return createResponseErrors(response);
    },
    invalidatesTags: ['Chapter'],
  });

  return createChapterQuery;
}

export default createChapter;
