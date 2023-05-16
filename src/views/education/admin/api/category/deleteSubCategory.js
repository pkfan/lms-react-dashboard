import createResponseErrors from '@/helpers/createResponseErrors';

export default function deleteSubCategory(builder) {
  const deleteSubCategoryQuery = builder.mutation({
    query: (data) => ({
      url: `/admin/subcategory/delete`,
      method: 'POST',
      data,
    }),
    transformResponse: (response) => {
      console.log('deleteSubCategoryQuery response', response);
      return response.data;
    },
    transformErrorResponse: (response) => {
      console.log('deleteSubCategoryQuery errors response', response);

      return createResponseErrors(response);
    },
    invalidatesTags: ['Category'],
  });

  return deleteSubCategoryQuery;
}
