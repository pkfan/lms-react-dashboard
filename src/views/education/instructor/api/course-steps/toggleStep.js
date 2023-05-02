import createResponseErrors from '@/helpers/createResponseErrors';

export default function toggleStep(builder) {
  const toggleStepQuery = builder.mutation({
    query: ({ course_id, step, key, value }) => ({
      url: `/instructor/course/steps/toggle/${course_id}`,
      method: 'POST',
      data: { step, key, value },
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
