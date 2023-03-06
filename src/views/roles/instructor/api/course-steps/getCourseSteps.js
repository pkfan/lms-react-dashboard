import createResponseErrors from '@/helpers/createResponseErrors';

export default function getCourseSteps(builder) {
  const getCourseStepsQuery = builder.query({
    // note: an optional `queryFn` may be used in place of `query`
    query: (course_id) => ({
      url: `/instructor/course/steps/${course_id}`,
      method: 'GET',
    }),

    // Pick out data and prevent nested properties in a hook or selector
    transformResponse: (response) => {
      // console.log('/admin response', response);
      return response.data;
      // return JSON.parse(response.data);
    },
    // Pick out errors and prevent nested properties in a hook or selector
    transformErrorResponse: (response) => {
      // console.log('/admin error response : ', response);
      return createResponseErrors(response);
      // return null;
    },
    // providesTags: ['Category'],
  });

  return getCourseStepsQuery;
}
