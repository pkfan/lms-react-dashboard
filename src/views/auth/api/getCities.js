import createResponseErrors from '@/helpers/createResponseErrors';

export default function getCities(builder) {
  const citiesQuery = builder.query({
    // note: an optional `queryFn` may be used in place of `query`
    query: (state_id) => ({
      url: `/country/state/cities/${state_id}`,
      method: 'GET',
    }),
    // Pick out data and prevent nested properties in a hook or selector
    transformResponse: (response) => {
      // console.log('citiesQuery response', response);
      return response.data;
    },
    // Pick out errors and prevent nested properties in a hook or selector
    transformErrorResponse: (response) => {
      return createResponseErrors(response);
    },
  });

  return citiesQuery;
}
