import createResponseErrors from '@/helpers/createResponseErrors';

export default function getCourses(builder) {
  const getCoursesQuery = builder.query({
    query: () => ({
      url: `/instructor/courses`,
      method: 'GET',
    }),
    transformResponse: (response) => {
      console.log('getCoursesQuery response', response);
      return response.data;
    },
    transformErrorResponse: (response) => {
      return createResponseErrors(response);
    },
    providesTags: ['Course'],
  });

  return getCoursesQuery;
}
