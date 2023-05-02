import createResponseErrors from '@/helpers/createResponseErrors';

export function coursesBulkAction(builder) {
  const coursesBulkActionQuery = builder.mutation({
    query: (data) => ({
      url: `/admin/courses/bulk/action`,
      method: 'POST',
      data,
    }),
    transformResponse: (response) => {
      console.log('coursesBulkActionQuery response', response);
      return response.data;
    },
    transformErrorResponse: (response) => {
      console.log('coursesBulkActionQuery errors response', response);

      return createResponseErrors(response);
    },
    invalidatesTags: ['Course'],
  });

  return coursesBulkActionQuery;
}

export default coursesBulkAction;
