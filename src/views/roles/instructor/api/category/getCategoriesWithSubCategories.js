import createResponseErrors from '@/helpers/createResponseErrors';

export default function getCategoriesWithSubCategories(builder) {
  const getCategoriesWithSubCategoriesQuery = builder.query({
    query: () => ({
      url: `/categories-with-subcategories`,
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

  return getCategoriesWithSubCategoriesQuery;
}
