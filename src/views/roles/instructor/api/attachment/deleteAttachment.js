import createResponseErrors from '@/helpers/createResponseErrors';

export function deleteAttachment(builder) {
  const deleteAttachmentQuery = builder.mutation({
    query: (data) => ({
      url: `/instructor/course/attachment/delete`,
      method: 'POST',
      data,
    }),
    transformResponse: (response) => {
      console.log('deleteAttachmentQuery response', response);
      return response.data;
    },
    transformErrorResponse: (response) => {
      console.log('deleteAttachmentQuery errors response', response);

      return createResponseErrors(response);
    },
    invalidatesTags: ['Attachment'],
  });

  return deleteAttachmentQuery;
}

export default deleteAttachment;
