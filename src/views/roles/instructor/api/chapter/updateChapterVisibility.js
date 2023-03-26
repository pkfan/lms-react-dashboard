import createResponseErrors from '@/helpers/createResponseErrors';

export function updateChapterVisibility(builder) {
  const updateChapterVisibilityQuery = builder.mutation({
    query: (data) => ({
      url: `/instructor/course/chapter/visibility/update`,
      method: 'POST',
      data,
    }),
    transformResponse: (response) => {
      console.log('updateChapterVisibilityQuery response', response);
      return response.data;
    },
    transformErrorResponse: (response) => {
      console.log('updateChapterVisibilityQuery errors response', response);

      return createResponseErrors(response);
    },
    invalidatesTags: ['Chapter'],
  });

  return updateChapterVisibilityQuery;
}

export default updateChapterVisibility;
