import createResponseErrors from '@/helpers/createResponseErrors';

export default function getCourses(builder) {
  const getCoursesQuery = builder.query({
    // note: an optional `queryFn` may be used in place of `query`
    query: ({ url }) => {
      return {
        url,
        method: 'GET',
      };
    },
    // Pick out data and prevent nested properties in a hook or selector
    transformResponse: (response) => {
      console.log('/getCourses response', response);
      //   return response.data;
      return response;
    },
    // Pick out errors and prevent nested properties in a hook or selector
    transformErrorResponse: (response) => {
      console.log('/getCourses error response : ', response);
      return createResponseErrors(response);
      // return null;
    },
    providesTags: ['Course'],
  });

  return getCoursesQuery;
}
