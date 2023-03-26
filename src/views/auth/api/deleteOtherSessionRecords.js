import createResponseErrors from '@/helpers/createResponseErrors';

export default function deleteOtherSessionRecords(builder) {
  const deleteOtherSessionRecordsQuery = builder.mutation({
    query: () => ({
      url: `/delete-other-session-records`,
      method: 'POST',
      data: {},
    }),
    transformResponse: (response) => {
      return response;
    },
    transformErrorResponse: (response) => {
      return createResponseErrors(response);
    },
  });

  return deleteOtherSessionRecordsQuery;
}
