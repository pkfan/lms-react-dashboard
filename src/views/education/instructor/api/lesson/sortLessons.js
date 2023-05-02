import createResponseErrors from '@/helpers/createResponseErrors';

export function sortLessons(builder) {
  const sortLessonsQuery = builder.mutation({
    query: (data) => ({
      url: `/instructor/course/lessons/sort`,
      method: 'POST',
      data,
    }),
    transformResponse: (response) => {
      console.log('sortLessonsQuery response', response);
      return response.data;
    },
    transformErrorResponse: (response) => {
      console.log('sortLessonsQuery errors response', response);

      return createResponseErrors(response);
    },
    invalidatesTags: ['Lesson'],
  });

  return sortLessonsQuery;
}

export default sortLessons;
