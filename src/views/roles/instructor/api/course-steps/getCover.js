import createResponseErrors from '@/helpers/createResponseErrors';

export default function getCover(builder) {
  const getCoverQuery = builder.query({
    query: (image_id) => ({
      url: `/instructor/course/cover/${image_id}`,
      method: 'GET',
    }),
    // Pick out data and prevent nested properties in a hook or selector
    transformResponse: (response) => {
      console.log('getCoverQuery response', response);
      return response.data;
    },
    // Pick out errors and prevent nested properties in a hook or selector
    transformErrorResponse: (response) => {
      return createResponseErrors(response);
    },
    // The 2nd parameter is the destructured `QueryLifecycleApi`
  });

  return getCoverQuery;
}
