import createResponseErrors from '@/helpers/createResponseErrors';

export default function getCoursesTest(builder) {
  const CoursesTestQuery = builder.query({
    // note: an optional `queryFn` may be used in place of `query`
    query: () => ({
      url: `/courses-test`,
      method: 'GET',
    }),
    // Pick out data and prevent nested properties in a hook or selector
    transformResponse: (response) => {
      console.log('/getCoursesTest response', response);
      return response;
    },
    // Pick out errors and prevent nested properties in a hook or selector
    transformErrorResponse: (response) => {
      console.log('/getCoursesTest error response : ', response);
      return createResponseErrors(response);
    },
    // providesTags: ['TextEditor'],
  });

  return CoursesTestQuery;
}
