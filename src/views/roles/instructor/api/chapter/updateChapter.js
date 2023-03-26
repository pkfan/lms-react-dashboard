import createResponseErrors from '@/helpers/createResponseErrors';

export function updateChapter(builder) {
  const updateChapterQuery = builder.mutation({
    query: (data) => ({
      url: `/instructor/course/chapter/update`,
      method: 'POST',
      data,
    }),
    transformResponse: (response) => {
      console.log('updateChapterQuery response', response);
      return response.data;
    },
    transformErrorResponse: (response) => {
      console.log('updateChapterQuery errors response', response);

      return createResponseErrors(response);
    },
    invalidatesTags: ['Chapter'],
  });

  return updateChapterQuery;
}

export default updateChapter;
