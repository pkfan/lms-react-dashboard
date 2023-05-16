import createResponseErrors from '@/helpers/createResponseErrors';

export default function createSubCategory(builder) {
  const createSubCategoryQuery = builder.mutation({
    query: (data) => ({
      url: `/admin/subcategory/create`,
      method: 'POST',
      data,
    }),
    transformResponse: (response) => {
      console.log('createSubCategoryQuery response', response);
      return response.data;
    },
    transformErrorResponse: (response) => {
      console.log('createSubCategoryQuery errors response', response);

      return createResponseErrors(response);
    },
    invalidatesTags: ['Category'],
  });

  return createSubCategoryQuery;
}
