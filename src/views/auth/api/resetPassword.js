import createResponseErrors from '@/helpers/createResponseErrors';

export default function resetPassword(builder) {
  const resetPasswordQuery = builder.mutation({
    query: (data) => ({
      url: `/reset-password`,
      method: 'POST',
      data,
    }),
    transformResponse: (response) => {
      return response.data;
    },
    transformErrorResponse: (response) => {
      return createResponseErrors(response);
    },
    // invalidatesTags: ['Auth'],
  });

  return resetPasswordQuery;
}
