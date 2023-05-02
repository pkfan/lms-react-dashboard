import createResponseErrors from '@/helpers/createResponseErrors';

export default function insertRequirements(builder) {
  const insertRequirementsQuery = builder.mutation({
    query: (data) => ({
      url: `/instructor/course/requirements`,
      method: 'POST',
      data,
    }),
    transformResponse: (response) => {
      console.log('insertRequirementsQuery response', response);
      return response.data;
    },
    transformErrorResponse: (response) => {
      console.log('insertRequirementsQuery errors response', response);

      return createResponseErrors(response);
    },
    invalidatesTags: ['Course'],
  });

  return insertRequirementsQuery;
}
