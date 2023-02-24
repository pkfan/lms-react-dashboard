import createResponseErrors from '@/helpers/createResponseErrors';

export default function postTest(builder) {
  const postTestQuery = builder.mutation({
    // note: an optional `queryFn` may be used in place of `query`
    query: (file) => ({
      url: `/image`,
      method: 'POST',
      data: { file },
    }),
    // Pick out data and prevent nested properties in a hook or selector
    transformResponse: (response) => {
      console.log('postTestQuery response', response);
      return response.data;
    },
    // Pick out errors and prevent nested properties in a hook or selector
    transformErrorResponse: (response) => {
      console.log('postTestQuery errors response', response);

      return createResponseErrors(response);
    },
    invalidatesTags: ['TextEditor'],
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

  return postTestQuery;
}
