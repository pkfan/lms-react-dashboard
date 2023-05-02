import createResponseErrors from '@/helpers/createResponseErrors';

export function getChapters(builder) {
  const getChaptersQuery = builder.query({
    query: (courseId) => ({
      url: `/instructor/course/chapters/${courseId}`,
      method: 'GET',
    }),
    transformResponse: (response) => {
      console.log('getChaptersQuery response', response);
      return response.data;
    },
    transformErrorResponse: (response) => {
      return createResponseErrors(response);
    },
    providesTags: ['Chapter'],
  });

  return getChaptersQuery;
}

export default getChapters;
