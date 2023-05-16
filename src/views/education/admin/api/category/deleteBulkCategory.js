import createResponseErrors from '@/helpers/createResponseErrors';

export default function deleteBulkCategory(builder) {
  const deleteBulkCategoryQuery = builder.mutation({
    query: (data) => ({
      url: `/admin/categories/bulk/delete`,
      method: 'POST',
      data,
    }),
    transformResponse: (response) => {
      console.log('deleteBulkCategoryQuery response', response);
      return response.data;
    },
    transformErrorResponse: (response) => {
      console.log('deleteBulkCategoryQuery errors response', response);

      return createResponseErrors(response);
    },
    invalidatesTags: ['Category'],
  });

  return deleteBulkCategoryQuery;
}
