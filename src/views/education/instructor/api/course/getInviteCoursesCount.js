import createResponseErrors from '@/helpers/createResponseErrors';

export default function getInviteCoursesCount(builder) {
  const getInviteCoursesCountQuery = builder.query({
    query: () => ({
      url: `/instructor/courses/invites/count`,
      method: 'GET',
    }),
    transformResponse: (response) => {
      console.log('getInviteCoursesCountQuery response', response);
      return response.data;
    },
    transformErrorResponse: (response) => {
      return createResponseErrors(response);
    },
    providesTags: ['Course'],
  });

  return getInviteCoursesCountQuery;
}
