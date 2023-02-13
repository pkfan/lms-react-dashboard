import createResponseErrors from '@/helpers/createResponseErrors';

export default function getStates(builder) {
  const stateQuery = builder.query({
    // note: an optional `queryFn` may be used in place of `query`
    query: (country_code) => ({
      url: `/country/states/${country_code}`,
      method: 'GET',
    }),
    // Pick out data and prevent nested properties in a hook or selector
    transformResponse: (response) => {
      // console.log('stateQuery response', response);
      return response.data;
    },
    // Pick out errors and prevent nested properties in a hook or selector
    transformErrorResponse: (response) => {
      return createResponseErrors(response);
    },
  });

  return stateQuery;
}
