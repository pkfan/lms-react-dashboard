import createResponseErrors from '@/helpers/createResponseErrors';

export function courseAction(builder) {
  const courseActionQuery = builder.mutation({
    query: (data) => ({
      url: `/instructor/course/action`,
      method: 'POST',
      data,
    }),
    transformResponse: (response) => {
      console.log('courseActionQuery response', response);
      return response.data;
    },
    transformErrorResponse: (response) => {
      console.log('courseActionQuery errors response', response);

      return createResponseErrors(response);
    },
    invalidatesTags: ['Course'],
  });

  return courseActionQuery;
}

export default courseAction;
