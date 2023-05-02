import createResponseErrors from '@/helpers/createResponseErrors';

export default function insertCover(builder) {
  const insertCoverQuery = builder.mutation({
    query: ({ course_id, image_id }) => ({
      url: `/instructor/course/cover/update`,
      method: 'POST',
      data: { course_id, image_id },
    }),
    transformResponse: (response) => {
      console.log('insertCoverQuery response', response);
      return response.data;
    },
    transformErrorResponse: (response) => {
      console.log('insertCoverQuery errors response', response);

      return createResponseErrors(response);
    },
    invalidatesTags: ['Course', 'Image'],
  });

  return insertCoverQuery;
}
