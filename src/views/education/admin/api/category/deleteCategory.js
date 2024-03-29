import createResponseErrors from '@/helpers/createResponseErrors';

export default function deleteCategory(builder) {
  const deleteCategoryQuery = builder.mutation({
    query: (data) => ({
      url: `/admin/category/delete`,
      method: 'POST',
      data,
    }),
    transformResponse: (response) => {
      console.log('deleteCategoryQuery response', response);
      return response.data;
    },
    transformErrorResponse: (response) => {
      console.log('deleteCategoryQuery errors response', response);

      return createResponseErrors(response);
    },
    invalidatesTags: ['Category'],
  });

  return deleteCategoryQuery;
}
