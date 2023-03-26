import createResponseErrors from '@/helpers/createResponseErrors';

export default function getSubCategories(builder) {
  const getSubCategoriesQuery = builder.query({
    query: ({ categoryId }) => ({
      url: `/admin/course/subcategories/${categoryId}`,
      method: 'GET',
    }),
    transformResponse: (response) => {
      return response.data;
    },
    transformErrorResponse: (response) => {
      return createResponseErrors(response);
    },
    providesTags: ['Category'],
  });

  return getSubCategoriesQuery;
}
