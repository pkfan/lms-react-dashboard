import createResponseErrors from '@/helpers/createResponseErrors';

export default function postTest(builder) {
  const postTestQuery = builder.mutation({
    // note: an optional `queryFn` may be used in place of `query`
    query: (file) => ({
      url: `/image`,
      method: 'POST',
      data: { file },
    }),
    transformResponse: (response) => {
      console.log('postTestQuery response', response);
      return response.data;
    },
    transformErrorResponse: (response) => {
      console.log('postTestQuery errors response', response);

      return createResponseErrors(response);
    },
    invalidatesTags: ['TextEditor'],
  });

  return postTestQuery;
}
