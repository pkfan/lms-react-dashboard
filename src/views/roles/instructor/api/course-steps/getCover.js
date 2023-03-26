import createResponseErrors from '@/helpers/createResponseErrors';

export default function getCover(builder) {
  const getCoverQuery = builder.query({
    query: (image_id) => ({
      url: `/instructor/course/cover/${image_id}`,
      method: 'GET',
    }),
    transformResponse: (response) => {
      console.log('getCoverQuery response', response);
      return response.data;
    },
    transformErrorResponse: (response) => {
      return createResponseErrors(response);
    },
    providesTags: ['Image'],
  });

  return getCoverQuery;
}
