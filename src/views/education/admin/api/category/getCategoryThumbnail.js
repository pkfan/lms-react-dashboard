import createResponseErrors from '@/helpers/createResponseErrors';

export default function getCategoryThumbnail(builder) {
  const getCategoryThumbnailQuery = builder.query({
    query: (image_id) => ({
      url: `/admin/course/category/thumbnail/${image_id}`,
      method: 'GET',
    }),
    transformResponse: (response) => {
      console.log('getCategoryThumbnailQuery response', response);
      return response.data;
    },
    transformErrorResponse: (response) => {
      return createResponseErrors(response);
    },
    providesTags: ['Image'],
  });

  return getCategoryThumbnailQuery;
}
