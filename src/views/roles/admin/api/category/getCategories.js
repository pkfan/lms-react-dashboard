import createResponseErrors from '@/helpers/createResponseErrors';

export default function getCategories(builder) {
  const getCategoriesQuery = builder.query({
    // note: an optional `queryFn` may be used in place of `query`
    query: ({ page, search }) => {
      let url = `/admin/course/categories?page=${page}`;
      if (search) {
        url = url + `&search=${search}`;
      }

      return {
        url: url,
        method: 'GET',
      };
    },
    // Pick out data and prevent nested properties in a hook or selector
    transformResponse: (response) => {
      // console.log('/admin response', response);
      //   return response.data;
      return response;
    },
    // Pick out errors and prevent nested properties in a hook or selector
    transformErrorResponse: (response) => {
      // console.log('/admin error response : ', response);
      return createResponseErrors(response);
      // return null;
    },
    // providesTags: ['Category'],
  });

  return getCategoriesQuery;
}
