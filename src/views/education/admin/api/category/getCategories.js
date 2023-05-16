import createResponseErrors from '@/helpers/createResponseErrors';

export default function getCategories(builder) {
  const getCategoriesQuery = builder.query({
    query: ({ url }) => {
      return {
        url: url,
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

  return getCategoriesQuery;
}
