import createResponseErrors from '@/helpers/createResponseErrors';

export default function insertDescription(builder) {
  const insertDescriptionQuery = builder.mutation({
    query: ({ course_id, description }) => ({
      url: `/instructor/course/description/${course_id}`,
      method: 'POST',
      data: { description },
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
