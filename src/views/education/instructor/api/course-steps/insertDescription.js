import createResponseErrors from '@/helpers/createResponseErrors';

export default function insertDescription(builder) {
  const insertDescriptionQuery = builder.mutation({
    query: (data) => ({
      url: `/instructor/course/description`,
      method: 'POST',
      data,
    }),
    transformResponse: (response) => {
      console.log('insertDescriptionQuery response', response);
      return response.data;
    },
    transformErrorResponse: (response) => {
      console.log('insertDescriptionQuery errors response', response);

      return createResponseErrors(response);
    },
    invalidatesTags: ['Course'],
  });

  return insertDescriptionQuery;
}
