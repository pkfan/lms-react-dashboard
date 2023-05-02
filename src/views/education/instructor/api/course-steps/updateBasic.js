import createResponseErrors from '@/helpers/createResponseErrors';

export default function updateBasic(builder) {
  const updateBasicQuery = builder.mutation({
    query: (data) => ({
      url: `/instructor/course/basic/update`,
      method: 'POST',
      data,
    }),
    transformResponse: (response) => {
      console.log('updateBasicQuery response', response);
      return response.data;
    },
    transformErrorResponse: (response) => {
      console.log('updateBasicQuery errors response', response);

      return createResponseErrors(response);
    },
    invalidatesTags: ['Course'],
  });

  return updateBasicQuery;
}
