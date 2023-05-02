import createResponseErrors from '@/helpers/createResponseErrors';

export default function updateCategory(builder) {
  const updateCategoryQuery = builder.mutation({
    query: ({ id, name, description }) => ({
      url: `/admin/course/category/update/${id}`,
      method: 'POST',
      data: { name, description },
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
