import createResponseErrors from '@/helpers/createResponseErrors';

export default function getStates(builder) {
  const stateQuery = builder.query({
    query: (country_code) => {
      if (!country_code) {
        throw new Error('skip request on null. [pkfan error]');
      }

      return {
        url: `/country/states/${country_code}`,
        method: 'GET',
      };
    },
    transformResponse: (response) => {
      // console.log('stateQuery response', response);
      return response.data;
    },
    transformErrorResponse: (response) => {
      return createResponseErrors(response);
    },
  });

  return stateQuery;
}
