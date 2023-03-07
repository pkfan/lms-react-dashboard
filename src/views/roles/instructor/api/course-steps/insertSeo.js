import createResponseErrors from '@/helpers/createResponseErrors';

export default function insertSeo(builder) {
  const insertSeoQuery = builder.mutation({
    // note: an optional `queryFn` may be used in place of `query`
    query: ({ course_id, seo, slug }) => ({
      url: `/instructor/course/seo/update`,
      method: 'POST',
      data: { course_id, seo, slug },
    }),
    // Pick out data and prevent nested properties in a hook or selector
    transformResponse: (response) => {
      console.log('insertSeoQuery response', response);
      return response.data;
    },
    // Pick out errors and prevent nested properties in a hook or selector
    transformErrorResponse: (response) => {
      console.log('insertSeoQuery errors response', response);

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

  return insertSeoQuery;
}
