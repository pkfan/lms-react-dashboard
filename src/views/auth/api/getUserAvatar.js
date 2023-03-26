import createResponseErrors from '@/helpers/createResponseErrors';

export default function getUserAvatar(builder) {
  const userAvatarQuery = builder.query({
    query: () => ({
      url: `/avatar`,
      method: 'GET',
    }),
    transformResponse: (response) => {
      console.log('userAvatarQuery response', response);
      return response.data;
    },
    transformErrorResponse: (response) => {
      return createResponseErrors(response);
    },
    providesTags: ['Image'],
  });

  return userAvatarQuery;
}
