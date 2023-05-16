import createResponseErrors from '@/helpers/createResponseErrors';

export default function deleteBulkSubCategory(builder) {
  const deleteBulkSubCategoryQuery = builder.mutation({
    query: (data) => ({
      url: `/admin/subcategories/bulk/delete`,
      method: 'POST',
      data,
    }),
    transformResponse: (response) => {
      console.log('deleteBulkSubCategoryQuery response', response);
      return response.data;
    },
    transformErrorResponse: (response) => {
      console.log('deleteBulkSubCategoryQuery errors response', response);

      return createResponseErrors(response);
    },
    invalidatesTags: ['Category'],
  });

  return deleteBulkSubCategoryQuery;
}
