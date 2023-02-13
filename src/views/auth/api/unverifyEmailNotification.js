import createResponseErrors from '@/helpers/createResponseErrors';

export default function unverifyEmailNotification(builder) {
  const unverifyEmailNotificationQuery = builder.mutation({
    // note: an optional `queryFn` may be used in place of `query`
    query: () => ({
      url: `/email/verification-notification`,
      method: 'POST',
      data: {},
    }),
    // Pick out data and prevent nested properties in a hook or selector
    transformResponse: (response) => {
      // console.log('unverifyEmailNotificationQuery response', response);
      return response.data;
    },
    // Pick out errors and prevent nested properties in a hook or selector
    transformErrorResponse: (response) => {
      return createResponseErrors(response);
    },
    invalidatesTags: ['Auth'],
  });

  return unverifyEmailNotificationQuery;
}
