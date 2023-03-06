import createResponseErrors from '@/helpers/createResponseErrors';

export default function getCategoryThumbnail(builder) {
  const getCategoryThumbnailQuery = builder.query({
    query: (image_id) => ({
      url: `/instructor/course/thumbnail/${image_id}`,
      method: 'GET',
    }),
    // Pick out data and prevent nested properties in a hook or selector
    transformResponse: (response) => {
      console.log('getCategoryThumbnailQuery response', response);
      return response.data;
    },
    // Pick out errors and prevent nested properties in a hook or selector
    transformErrorResponse: (response) => {
      return createResponseErrors(response);
    },
    // The 2nd parameter is the destructured `QueryLifecycleApi`
  });

  return getCategoryThumbnailQuery;
}
