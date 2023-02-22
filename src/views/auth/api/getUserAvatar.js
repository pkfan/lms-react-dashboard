import createResponseErrors from '@/helpers/createResponseErrors';

export default function getUserAvatar(builder) {
  const userAvatarQuery = builder.query({
    query: () => ({
      url: `/avatar`,
      method: 'GET',
    }),
    // Pick out data and prevent nested properties in a hook or selector
    transformResponse: (response) => {
      console.log('userAvatarQuery response', response);
      return response.data;
    },
    // Pick out errors and prevent nested properties in a hook or selector
    transformErrorResponse: (response) => {
      return createResponseErrors(response);
    },
    // The 2nd parameter is the destructured `QueryLifecycleApi`
  });

  return userAvatarQuery;
}
