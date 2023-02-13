import createResponseErrors from '@/helpers/createResponseErrors';

export default function updatePassword(builder) {
  const updatePasswordQuery = builder.mutation({
    // note: an optional `queryFn` may be used in place of `query`
    query: (data) => ({
      url: `/user/password`,
      method: 'PUT',
      data,
    }),
    // Pick out data and prevent nested properties in a hook or selector
    transformResponse: (response) => {
      console.log('updatePasswordQuery response', response);
      return response.data;
    },
    // Pick out errors and prevent nested properties in a hook or selector
    transformErrorResponse: (response) => {
      return createResponseErrors(response);
    },
    invalidatesTags: ['Auth'],
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

  return updatePasswordQuery;
}
