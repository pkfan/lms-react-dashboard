import createResponseErrors from '@/helpers/createResponseErrors';

export default function forgetPassword(builder) {
  const forgetPasswordQuery = builder.mutation({
    query: (data) => ({
      url: `/forgot-password`,
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

  return forgetPasswordQuery;
}
