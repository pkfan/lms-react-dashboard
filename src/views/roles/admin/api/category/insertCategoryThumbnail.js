import createResponseErrors from '@/helpers/createResponseErrors';

export default function insertCategoryThumbnail(builder) {
  const insertCategoryThumbnailQuery = builder.mutation({
    // note: an optional `queryFn` may be used in place of `query`
    query: ({ category_id, image_id }) => ({
      url: `/admin/course/category/thumbnail/update`,
      method: 'POST',
      data: { category_id, image_id },
    }),
    // Pick out data and prevent nested properties in a hook or selector
    transformResponse: (response) => {
      console.log('insertCategoryThumbnailQuery response', response);
      return response.data;
    },
    // Pick out errors and prevent nested properties in a hook or selector
    transformErrorResponse: (response) => {
      console.log('insertCategoryThumbnailQuery errors response', response);

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

  return insertCategoryThumbnailQuery;
}
