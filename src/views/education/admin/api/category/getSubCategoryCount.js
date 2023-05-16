import createResponseErrors from '@/helpers/createResponseErrors';

export default function getSubCategoryCount(builder) {
  const getSubCategoryCountQuery = builder.query({
    query: () => ({
      url: `/admin/subcategories/count`,
      method: 'GET',
    }),
    transformResponse: (response) => {
      console.log('getSubCategoryCountQuery response', response);
      return response.data;
    },
    transformErrorResponse: (response) => {
      return createResponseErrors(response);
    },
    providesTags: ['Category'],
  });

  return getSubCategoryCountQuery;
}
