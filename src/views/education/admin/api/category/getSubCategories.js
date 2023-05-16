import createResponseErrors from '@/helpers/createResponseErrors';

export default function getSubCategories(builder) {
  const getSubCategoriesQuery = builder.query({
    query: ({ url }) => {
      return {
        url,
        method: 'GET',
      };
    },
    transformResponse: (response) => {
      return response;
    },
    transformErrorResponse: (response) => {
      return createResponseErrors(response);
    },
    providesTags: ['Category'],
  });

  return getSubCategoriesQuery;
}
