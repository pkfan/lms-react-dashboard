import createResponseErrors from '@/helpers/createResponseErrors';

export default function insertFaq(builder) {
  const insertFaqQuery = builder.mutation({
    query: (data) => ({
      url: `/instructor/course/faq`,
      method: 'POST',
      data,
    }),
    transformResponse: (response) => {
      console.log('insertFaqQuery response', response);
      return response.data;
    },
    transformErrorResponse: (response) => {
      console.log('insertFaqQuery errors response', response);

      return createResponseErrors(response);
    },
    invalidatesTags: ['Course'],
  });

  return insertFaqQuery;
}
