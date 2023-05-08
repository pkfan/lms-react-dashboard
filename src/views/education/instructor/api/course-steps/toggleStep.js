import createResponseErrors from '@/helpers/createResponseErrors';

export default function toggleStep(builder) {
  const toggleStepQuery = builder.mutation({
    query: (data) => ({
      url: `/instructor/course/steps/toggle`,
      method: 'POST',
      data,
    }),
    transformResponse: (response) => {
      return response.data;
    },
    transformErrorResponse: (response) => {
      return createResponseErrors(response);
    },
    invalidatesTags: ['Course', 'CourseSteps'],
  });

  return toggleStepQuery;
}
