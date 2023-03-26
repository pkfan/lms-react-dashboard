import createResponseErrors from '@/helpers/createResponseErrors';

export default function getCities(builder) {
  const citiesQuery = builder.query({
    query: (state_id) => ({
      url: `/country/state/cities/${state_id}`,
      method: 'GET',
    }),
    transformResponse: (response) => {
      // console.log('citiesQuery response', response);
      return response.data;
    },
    transformErrorResponse: (response) => {
      return createResponseErrors(response);
    },
  });

  return citiesQuery;
}
