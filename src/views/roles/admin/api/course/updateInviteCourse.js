import createResponseErrors from '@/helpers/createResponseErrors';

export function updateInviteCourse(builder) {
  const updateInviteCourseQuery = builder.mutation({
    query: (data) => ({
      url: `/instructor/courses/invite/update`,
      method: 'POST',
      data,
    }),
    transformResponse: (response) => {
      console.log('updateInviteCourseQuery response', response);
      return response.data;
    },
    transformErrorResponse: (response) => {
      console.log('updateInviteCourseQuery errors response', response);

      return createResponseErrors(response);
    },
    invalidatesTags: ['Course'],
  });

  return updateInviteCourseQuery;
}

export default updateInviteCourse;
