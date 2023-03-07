import createResponseErrors from '@/helpers/createResponseErrors';

export function deleteChapter(builder) {
  const deleteChapterQuery = builder.mutation({
    // note: an optional `queryFn` may be used in place of `query`
    query: (data) => ({
      url: `/instructor/course/chapter/delete`,
      method: 'POST',
      data,
    }),
    // Pick out data and prevent nested properties in a hook or selector
    transformResponse: (response) => {
      console.log('deleteChapterQuery response', response);
      return response.data;
    },
    // Pick out errors and prevent nested properties in a hook or selector
    transformErrorResponse: (response) => {
      console.log('deleteChapterQuery errors response', response);

      return createResponseErrors(response);
    },
    invalidatesTags: ['Course'],
    // // onQueryStarted is useful for optimistic updates
    // // The 2nd parameter is the destructured `MutationLifecycleApi`
    // async onQueryStarted(
    //   arg,
    //   { dispatch, getState, queryFulfilled, requestId, extra, getCacheEntry },
    // ) {},
    // // The 2nd parameter is the destructured `MutationCacheLifecycleApi`
    // async onCacheEntryAdded(
    //   arg,
    //   { dispatch, getState, extra, requestId, cacheEntryRemoved, cacheDataLoaded, getCacheEntry },
    // ) {},
  });

  return deleteChapterQuery;
}

export default deleteChapter;
