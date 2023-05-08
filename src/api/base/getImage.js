import createResponseErrors from '@/helpers/createResponseErrors';

export default function getImage(builder) {
  const imageQuery = builder.query({
    // note: an optional `queryFn` may be used in place of `query`
    query: (imageId) => {
      if (!imageId) {
        throw new Error('skip request on null. [pkfan error]');
      }
      return {
        url: `/image/${imageId}`,
        method: 'GET',
      };
    },
    // Pick out data and prevent nested properties in a hook or selector
    transformResponse: (response) => {
      console.log('/getImage response', response);
      return response.data;
    },
    // Pick out errors and prevent nested properties in a hook or selector
    transformErrorResponse: (response) => {
      console.log('/getImage error response : ', response);
      return createResponseErrors(response);
    },
    providesTags: ['Image'],
  });

  return imageQuery;
}
