import createResponseErrors from '@/helpers/createResponseErrors';

export default function getCoursesCount(builder) {
  const getCoursesCountQuery = builder.query({
    query: () => ({
      url: `/instructor/courses/count`,
      method: 'GET',
    }),
    transformResponse: (response) => {
      console.log('getCoursesCountQuery response', response);
      return response.data;
    },
    transformErrorResponse: (response) => {
      return createResponseErrors(response);
    },
    providesTags: ['Course'],
  });

  return getCoursesCountQuery;
}
