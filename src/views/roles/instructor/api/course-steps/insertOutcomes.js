import createResponseErrors from '@/helpers/createResponseErrors';

export default function insertOutcomes(builder) {
  const insertOutcomesQuery = builder.mutation({
    query: (data) => ({
      url: `/instructor/course/outcomes`,
      method: 'POST',
      data,
    }),
    transformResponse: (response) => {
      console.log('insertOutcomesQuery response', response);
      return response.data;
    },
    transformErrorResponse: (response) => {
      console.log('insertOutcomesQuery errors response', response);

      return createResponseErrors(response);
    },
    invalidatesTags: ['Course'],
  });

  return insertOutcomesQuery;
}
