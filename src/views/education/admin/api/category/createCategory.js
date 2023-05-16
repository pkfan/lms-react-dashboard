import createResponseErrors from '@/helpers/createResponseErrors';

export default function createCategory(builder) {
  const createCategoryQuery = builder.mutation({
    query: (data) => ({
      url: `/admin/category/create`,
      method: 'POST',
      data,
    }),
    transformResponse: (response) => {
      console.log('createCategoryQuery response', response);
      return response.data;
    },
    transformErrorResponse: (response) => {
      console.log('createCategoryQuery errors response', response);

      return createResponseErrors(response);
    },
    invalidatesTags: ['Category'],
  });

  return createCategoryQuery;
}
