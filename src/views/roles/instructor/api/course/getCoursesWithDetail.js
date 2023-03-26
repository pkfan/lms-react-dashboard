import createResponseErrors from '@/helpers/createResponseErrors';

export default function getCoursesWithDetail(builder) {
  const getCoursesWithDetailQuery = builder.query({
    // note: an optional `queryFn` may be used in place of `query`
    query: ({ page, search, tab }) => {
      let url = `/instructor/courses-with-detail?page=${page}&tab=${tab}`;

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
      console.log('/getCoursesWithDetail response', response);
      //   return response.data;
      return response;
    },
    // Pick out errors and prevent nested properties in a hook or selector
    transformErrorResponse: (response) => {
      console.log('/getCoursesWithDetail error response : ', response);
      return createResponseErrors(response);
      // return null;
    },
    providesTags: ['Course'],
  });

  return getCoursesWithDetailQuery;
}
