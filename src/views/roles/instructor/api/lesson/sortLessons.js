import createResponseErrors from '@/helpers/createResponseErrors';

export function sortLessons(builder) {
  const sortLessonsQuery = builder.mutation({
    // note: an optional `queryFn` may be used in place of `query`
    query: (data) => ({
      url: `/instructor/course/lessons/sort`,
      method: 'POST',
      data,
    }),
    // Pick out data and prevent nested properties in a hook or selector
    transformResponse: (response) => {
      console.log('sortLessonsQuery response', response);
      return response.data;
    },
    // Pick out errors and prevent nested properties in a hook or selector
    transformErrorResponse: (response) => {
      console.log('sortLessonsQuery errors response', response);

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

  return sortLessonsQuery;
}

export default sortLessons;
