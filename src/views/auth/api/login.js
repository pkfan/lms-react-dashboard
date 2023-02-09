export default function login(builder) {
  const loginQuery = builder.mutation({
    // note: an optional `queryFn` may be used in place of `query`
    query: ({ email, password, remember }) => ({
      url: `/login`,
      method: 'POST',
      data: { email, password, remember },
    }),
    // Pick out data and prevent nested properties in a hook or selector
    transformResponse: (response) => {
      console.log('loginQuery response', response);
      return response.data;
    },
    // Pick out errors and prevent nested properties in a hook or selector
    transformErrorResponse: (response) => {
      let errors;
      if (response.data.errors?.email[0]) {
        errors = response.data.errors?.email[0];
      } else if (response.data.message) {
        errors = response.data.message;
      } else {
        errors = response.data;
      }
      console.log('loginQuery transformErrorResponse', response);

      return { status: response.status, errors };
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

  return loginQuery;
}
