import createResponseErrors from '@/helpers/createResponseErrors';

export default function confirmPassword(builder) {
  const confirmPasswordQuery = builder.mutation({
    query: (password) => ({
      url: `/user/confirm-password`,
      method: 'POST',
      data: { password },
    }),
    transformResponse: (response) => {
      console.log('confirmPasswordQuery response', response);
      return response.confirmed;
    },
    transformErrorResponse: (response) => {
      console.log('confirmPasswordQuery errors response', response);

      return createResponseErrors(response);
    },
  });

  return confirmPasswordQuery;
}
