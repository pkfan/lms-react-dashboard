import createResponseErrors from '@/helpers/createResponseErrors';

export default function updateSubCategory(builder) {
  const updateSubCategoryQuery = builder.mutation({
    query: (data) => ({
      url: `/admin/subcategory/update`,
      method: 'POST',
      data,
    }),
    transformResponse: (response) => {
      console.log('updateSubCategoryQuery response', response);
      return response.data;
    },
    transformErrorResponse: (response) => {
      console.log('updateSubCategoryQuery errors response', response);

      return createResponseErrors(response);
    },
    invalidatesTags: ['Category'],
  });

  return updateSubCategoryQuery;
}
