import createResponseErrors from '@/helpers/createResponseErrors';

export default function getSubCategories(builder) {
  const getSubCategoriesQuery = builder.query({
    query: ({ categoryId }) => {
      if (!categoryId) {
        throw new Error('skip request on null. [pkfan error]');
      }

      return {
        url: `/admin/course/subcategories/${categoryId}`,
        method: 'GET',
      };
    },
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
