import createResponseErrors from '@/helpers/createResponseErrors';

export function deleteCoursePermanent(builder) {
  const deleteCoursePermanentQuery = builder.mutation({
    query: (data) => ({
      url: `/instructor/course/delete-permanent`,
      method: 'POST',
      data,
    }),
    transformResponse: (response) => {
      console.log('deleteCoursePermanentQuery response', response);
      return response.data;
    },
    transformErrorResponse: (response) => {
      console.log('deleteCoursePermanentQuery errors response', response);

      return createResponseErrors(response);
    },
    invalidatesTags: ['Course'],
  });

  return deleteCoursePermanentQuery;
}

export default deleteCoursePermanent;
