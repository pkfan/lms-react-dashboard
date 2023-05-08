import createResponseErrors from '@/helpers/createResponseErrors';

export function getAttachments(builder) {
  const getAttachmentsQuery = builder.query({
    query: (courseId) => {
      if (!courseId) {
        throw new Error('skip request on null. [pkfan error]');
      }

      return {
        url: `/instructor/course/attachments/${courseId}`,
        method: 'GET',
      };
    },
    transformResponse: (response) => {
      console.log('getAttachmentsQuery response', response);
      return response.data;
    },
    transformErrorResponse: (response) => {
      return createResponseErrors(response);
    },
    providesTags: ['Attachment'],
  });

  return getAttachmentsQuery;
}

export default getAttachments;
