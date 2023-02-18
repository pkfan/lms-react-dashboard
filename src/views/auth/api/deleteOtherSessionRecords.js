import createResponseErrors from '@/helpers/createResponseErrors';

export default function deleteOtherSessionRecords(builder) {
  const deleteOtherSessionRecordsQuery = builder.mutation({
    query: () => ({
      url: `/delete-other-session-records`,
      method: 'POST',
      data: {},
    }),
    transformResponse: (response) => {
      // console.log('sessiont browser endpoint response', response);
      return response;
    },
    transformErrorResponse: (response) => {
      // console.log('sessiont browser endpoint errors', response);

      return createResponseErrors(response);
    },
  });

  return deleteOtherSessionRecordsQuery;
}
