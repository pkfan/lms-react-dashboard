import createResponseErrors from '@/helpers/createResponseErrors';

export default function getTrashCourses(builder) {
  const getTrashCoursesQuery = builder.query({
    query: () => ({
      url: `/instructor/courses/trash`,
      method: 'GET',
    }),
    transformResponse: (response) => {
      console.log('getTrashCoursesQuery response', response);
      return response;
    },
    transformErrorResponse: (response) => {
      return createResponseErrors(response);
    },
    providesTags: ['Course'],
  });

  return getTrashCoursesQuery;
}
