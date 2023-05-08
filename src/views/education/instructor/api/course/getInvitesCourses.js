import createResponseErrors from '@/helpers/createResponseErrors';

export default function getInvitesCourses(builder) {
  const getInvitesCoursesQuery = builder.query({
    query: ({ url }) => ({
      url,
      method: 'GET',
    }),
    // Pick out data and prevent nested properties in a hook or selector
    transformResponse: (response) => {
      console.log('getInvitesCoursesQuery response', response);
      return response;
    },
    // Pick out errors and prevent nested properties in a hook or selector
    transformErrorResponse: (response) => {
      return createResponseErrors(response);
    },
    // The 2nd parameter is the destructured `QueryLifecycleApi`
    providesTags: ['Course'],
  });

  return getInvitesCoursesQuery;
}
