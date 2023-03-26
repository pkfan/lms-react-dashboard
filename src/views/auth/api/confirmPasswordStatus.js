import createResponseErrors from '@/helpers/createResponseErrors';

export default function confirmPasswordStatus(builder) {
  const confirmPasswordStatusQuery = builder.query({
    query: () => ({
      url: `/user/confirmed-password-status`,
      method: 'GET',
    }),
    transformResponse: (response) => {
      console.log('confirmPasswordStatusQuery response', response);
      return response.confirmed;
    },
    transformErrorResponse: (response) => {
      return createResponseErrors(response);
    },
  });

  return confirmPasswordStatusQuery;
}
