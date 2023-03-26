import createResponseErrors from '@/helpers/createResponseErrors';

export default function getImages(builder) {
  const imagesQuery = builder.query({
    // note: an optional `queryFn` may be used in place of `query`
    query: (page) => ({
      url: `/all-images?page=${page}`,
      method: 'GET',
    }),
    // Pick out data and prevent nested properties in a hook or selector
    transformResponse: (response) => {
      console.log('/getImages response', response);
      return response;
    },
    // Pick out errors and prevent nested properties in a hook or selector
    transformErrorResponse: (response) => {
      console.log('/getImages error response : ', response);
      return createResponseErrors(response);
    },
    providesTags: ['Image'],
  });

  return imagesQuery;
}
