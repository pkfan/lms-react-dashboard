import createResponseErrors from '@/helpers/createResponseErrors';

export default function getCategoryCount(builder) {
  const getCategoryCountQuery = builder.query({
    query: () => ({
      url: `/admin/categories/count`,
      method: 'GET',
    }),
    transformResponse: (response) => {
      console.log('getCategoryCountQuery response', response);
      return response.data;
    },
    transformErrorResponse: (response) => {
      return createResponseErrors(response);
    },
    providesTags: ['Category'],
  });

  return getCategoryCountQuery;
}
