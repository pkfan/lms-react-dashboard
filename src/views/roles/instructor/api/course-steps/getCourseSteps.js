import createResponseErrors from '@/helpers/createResponseErrors';

export default function getCourseSteps(builder) {
  const getCourseStepsQuery = builder.query({
    query: (course_id) => ({
      url: `/instructor/course/steps/${course_id}`,
      method: 'GET',
    }),

    transformResponse: (response) => {
      return response.data;
    },
    transformErrorResponse: (response) => {
      return createResponseErrors(response);
    },
    providesTags: ['Course', 'CourseSteps'],
  });

  return getCourseStepsQuery;
}
