import createResponseErrors from '@/helpers/createResponseErrors';

export default function getTrashCoursesCount(builder) {
  const getTrashCoursesCountQuery = builder.query({
    query: () => ({
      url: `/admin/courses/trash/count`,
      method: 'GET',
    }),
    transformResponse: (response) => {
      console.log('getTrashCoursesCountQuery response', response);
      return response.data;
    },
    transformErrorResponse: (response) => {
      return createResponseErrors(response);
    },
    providesTags: ['Course'],
  });

  return getTrashCoursesCountQuery;
}
