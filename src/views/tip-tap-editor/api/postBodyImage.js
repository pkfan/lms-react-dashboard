import createResponseErrors from '@/helpers/createResponseErrors';

export default function postBodyImage(builder) {
  const postBodyImageQuery = builder.mutation({
    // note: an optional `queryFn` may be used in place of `query`
    query: (file) => ({
      url: `/body-image`,
      method: 'POST',
      data: { file },
    }),
    // Pick out data and prevent nested properties in a hook or selector
    transformResponse: (response) => {
      console.log('postBodyImageQuery response', response);
      return response.data;
    },
    // Pick out errors and prevent nested properties in a hook or selector
    transformErrorResponse: (response) => {
      console.log('postBodyImageQuery errors response', response);

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

  return postBodyImageQuery;
}
