import createResponseErrors from '@/helpers/createResponseErrors';

export default function getDescription(builder) {
  const getDescriptionQuery = builder.query({
    query: (course_id) => ({
      url: `/instructor/course/description/${course_id}`,
      method: 'GET',
    }),

    transformResponse: (response) => {
      return response.data;
    },
    transformErrorResponse: (response) => {
      return createResponseErrors(response);
    },
    providesTags: ['Course'],
  });

  return getDescriptionQuery;
}
