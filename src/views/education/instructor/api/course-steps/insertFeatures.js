import createResponseErrors from '@/helpers/createResponseErrors';

export default function insertFeatures(builder) {
  const insertFeaturesQuery = builder.mutation({
    query: (data) => ({
      url: `/instructor/course/features`,
      method: 'POST',
      data,
    }),
    transformResponse: (response) => {
      console.log('insertFeaturesQuery response', response);
      return response.data;
    },
    transformErrorResponse: (response) => {
      console.log('insertFeaturesQuery errors response', response);

      return createResponseErrors(response);
    },
    invalidatesTags: ['Course'],
  });

  return insertFeaturesQuery;
}
