import createResponseErrors from '@/helpers/createResponseErrors';

export default function insertCategoryThumbnail(builder) {
  const insertCategoryThumbnailQuery = builder.mutation({
    query: ({ category_id, image_id }) => ({
      url: `/admin/course/category/thumbnail/update`,
      method: 'POST',
      data: { category_id, image_id },
    }),
    transformResponse: (response) => {
      console.log('insertCategoryThumbnailQuery response', response);
      return response.data;
    },
    transformErrorResponse: (response) => {
      console.log('insertCategoryThumbnailQuery errors response', response);

      return createResponseErrors(response);
    },
    invalidatesTags: ['Image'],
  });

  return insertCategoryThumbnailQuery;
}
