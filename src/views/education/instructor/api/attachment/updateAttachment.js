import createResponseErrors from '@/helpers/createResponseErrors';

export function updateAttachment(builder) {
  const updateAttachmentQuery = builder.mutation({
    query: (data) => ({
      url: `/instructor/course/attachment/update`,
      method: 'POST',
      data,
    }),
    transformResponse: (response) => {
      console.log('updateAttachmentQuery response', response);
      return response.data;
    },
    transformErrorResponse: (response) => {
      console.log('updateAttachmentQuery errors response', response);

      return createResponseErrors(response);
    },
    invalidatesTags: ['Attachment'],
  });

  return updateAttachmentQuery;
}

export default updateAttachment;
