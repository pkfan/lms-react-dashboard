import createResponseErrors from '@/helpers/createResponseErrors';

export function deleteChapter(builder) {
  const deleteChapterQuery = builder.mutation({
    query: (data) => ({
      url: `/instructor/course/chapter/delete`,
      method: 'POST',
      data,
    }),
    transformResponse: (response) => {
      console.log('deleteChapterQuery response', response);
      return response.data;
    },
    transformErrorResponse: (response) => {
      console.log('deleteChapterQuery errors response', response);

      return createResponseErrors(response);
    },
    invalidatesTags: ['Chapter'],
  });

  return deleteChapterQuery;
}

export default deleteChapter;
