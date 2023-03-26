import createResponseErrors from '@/helpers/createResponseErrors';

export default function getCategory(builder) {
  const getCategoryQuery = builder.query({
    query: (categoryId) => ({
      url: `/admin/course/category/${categoryId}`,
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

  return getCategoryQuery;
}
