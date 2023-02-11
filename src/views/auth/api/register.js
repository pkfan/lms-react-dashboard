export default function register(builder) {
  const registerQuery = builder.mutation({
    // note: an optional `queryFn` may be used in place of `query`
    query: (data) => ({
      url: `/register`,
      method: 'POST',
      data,
    }),
    // Pick out data and prevent nested properties in a hook or selector
    transformResponse: (response) => {
      console.log('registerQuery response', response);
      return response.data;
    },
    // Pick out errors and prevent nested properties in a hook or selector
    transformErrorResponse: (response) => {
      let errors;
      if (response.data.errors?.email[0]) {
        errors = response.data.errors?.email[0];
      } else if (response.data.message) {
        errors = response.data.message;
      } else {
        errors = response.data;
      }
      console.log('registerQuery transformErrorResponse', response);

      return { status: response.status, errors };
    },
    invalidatesTags: ['Auth'],
  });

  return registerQuery;
}
