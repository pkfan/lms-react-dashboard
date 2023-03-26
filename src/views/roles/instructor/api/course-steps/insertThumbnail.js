import createResponseErrors from '@/helpers/createResponseErrors';

export default function insertThumbnail(builder) {
  const insertThumbnailQuery = builder.mutation({
    query: ({ course_id, image_id }) => ({
      url: `/instructor/course/thumbnail/update`,
      method: 'POST',
      data: { course_id, image_id },
    }),
    transformResponse: (response) => {
      console.log('insertThumbnailQuery response', response);
      return response.data;
    },
    transformErrorResponse: (response) => {
      console.log('insertThumbnailQuery errors response', response);

      return createResponseErrors(response);
    },
    invalidatesTags: ['Course', 'CourseSteps', 'Image'],
  });

  return insertThumbnailQuery;
}
