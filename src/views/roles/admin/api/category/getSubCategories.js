import createResponseErrors from '@/helpers/createResponseErrors';

export default function getSubCategories(builder) {
  const getSubCategoriesQuery = builder.query({
    // note: an optional `queryFn` may be used in place of `query`
    query: ({ categoryId }) => ({
      url: `/admin/course/subcategories/${categoryId}`,
      method: 'GET',
    }),
    // Pick out data and prevent nested properties in a hook or selector
    transformResponse: (response) => {
      // console.log('/admin response', response);
      //   return response.data;
      return response.data;
    },
    // Pick out errors and prevent nested properties in a hook or selector
    transformErrorResponse: (response) => {
      // console.log('/admin error response : ', response);
      return createResponseErrors(response);
      // return null;
    },
    // providesTags: ['Category'],
  });

  return getSubCategoriesQuery;
}
