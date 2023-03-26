import createResponseErrors from '@/helpers/createResponseErrors';

export default function successfullyVerifiedEmail(builder) {
  const successfullyVerifiedEmailQuery = builder.query({
    // note: an optional `queryFn` may be used in place of `query`
    query: ({ id, hash, expires, signature }) => ({
      url: `/email/verify/${id}/${hash}?expires=${expires}&signature=${signature}`,
      method: 'GET',
    }),
    // Pick out data and prevent nested properties in a hook or selector
    transformResponse: (response) => {
      console.log('successfullyVerifiedEmailQuery response', response);
      return response.data;
    },
    // Pick out errors and prevent nested properties in a hook or selector
    transformErrorResponse: (response) => {
      return createResponseErrors(response);
    },
    invalidatesTags: ['Auth'],
  });

  return successfullyVerifiedEmailQuery;
}
