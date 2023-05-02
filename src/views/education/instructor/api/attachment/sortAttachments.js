import createResponseErrors from '@/helpers/createResponseErrors';

export function sortAttachments(builder) {
  const sortAttachmentsQuery = builder.mutation({
    query: (data) => ({
      url: `/instructor/course/attachments/sort`,
      method: 'POST',
      data,
    }),
    transformResponse: (response) => {
      console.log('sortAttachmentsQuery response', response);
      return response.data;
    },
    transformErrorResponse: (response) => {
      console.log('sortAttachmentsQuery errors response', response);

      return createResponseErrors(response);
    },
    invalidatesTags: ['Attachment'],
  });

  return sortAttachmentsQuery;
}

export default sortAttachments;
