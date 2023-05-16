import createResponseErrors from '@/helpers/createResponseErrors';

export default function updateCategory(builder) {
  const updateCategoryQuery = builder.mutation({
    query: (data) => ({
      url: `/admin/category/update`,
      method: 'POST',
      data,
    }),
    transformResponse: (response) => {
      console.log('updateCategoryQuery response', response);
      return response.data;
    },
    transformErrorResponse: (response) => {
      console.log('updateCategoryQuery errors response', response);

      return createResponseErrors(response);
    },
    invalidatesTags: ['Category'],
  });

  return updateCategoryQuery;
}
