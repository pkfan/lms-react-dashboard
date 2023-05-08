import createResponseErrors from '@/helpers/createResponseErrors';

export default function getCategoryThumbnail(builder) {
  const getCategoryThumbnailQuery = builder.query({
    query: (image_id) => {
      if (!image_id) {
        throw new Error('skip request on null. [pkfan error]');
      }
      return {
        url: `/instructor/course/thumbnail/${image_id}`,
        method: 'GET',
      };
    },
    transformResponse: (response) => {
      console.log('getCategoryThumbnailQuery response', response);
      return response.data;
    },
    transformErrorResponse: (response) => {
      return createResponseErrors(response);
    },
    providesTags: ['Course', 'CourseSteps', 'Image'],
  });

  return getCategoryThumbnailQuery;
}
