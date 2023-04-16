import createResponseErrors from '@/helpers/createResponseErrors';

export default function getInstructors(builder) {
  const getInstructorsQuery = builder.query({
    query: ({ url }) => ({
      url,
      method: 'GET',
    }),
    transformResponse: (response) => {
      console.log('getInstructorsQuery response', response);
      return response.data;
    },
    transformErrorResponse: (response) => {
      return createResponseErrors(response);
    },
  });

  return getInstructorsQuery;
}
