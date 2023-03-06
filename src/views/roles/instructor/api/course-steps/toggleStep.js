import createResponseErrors from '@/helpers/createResponseErrors';

export default function toggleStep(builder) {
  const toggleStepQuery = builder.mutation({
    // note: an optional `queryFn` may be used in place of `query`
    query: ({ course_id, step, key, value }) => ({
      url: `/instructor/course/steps/toggle/${course_id}`,
      method: 'POST',
      data: { step, key, value },
    }),
    // Pick out data and prevent nested properties in a hook or selector
    transformResponse: (response) => {
      // console.log('toggleStepQuery response', response);
      return response.data;
    },
    // Pick out errors and prevent nested properties in a hook or selector
    transformErrorResponse: (response) => {
      // console.log('toggleStepQuery errors response', response);

      return createResponseErrors(response);
    },
    // invalidatesTags: ['Course'],
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

  return toggleStepQuery;
}
