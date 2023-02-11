export default function getAuthUser(builder) {
  const authUserQuery = builder.query({
    query: () => ({
      url: `/user`,
      method: 'GET',
    }),
    // Pick out data and prevent nested properties in a hook or selector
    transformResponse: (response) => {
      console.log('authUserQuery response', response);
      return response.data;
    },
    // Pick out errors and prevent nested properties in a hook or selector
    transformErrorResponse: (response) => {
      let errors;
      if (response.data.errors) {
        errors = response.data.errors;
      } else {
        errors = response.data;
      }
      console.log('authUserQuery transformErrorResponse', response);
      return { status: response.status, errors };
    },

    // The 2nd parameter is the destructured `QueryLifecycleApi`
  });

  return authUserQuery;
}
