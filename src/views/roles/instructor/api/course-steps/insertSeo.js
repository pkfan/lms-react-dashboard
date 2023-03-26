import createResponseErrors from '@/helpers/createResponseErrors';

export default function insertSeo(builder) {
  const insertSeoQuery = builder.mutation({
    query: ({ course_id, seo, slug }) => ({
      url: `/instructor/course/seo/update`,
      method: 'POST',
      data: { course_id, seo, slug },
    }),
    transformResponse: (response) => {
      console.log('insertSeoQuery response', response);
      return response.data;
    },
    transformErrorResponse: (response) => {
      console.log('insertSeoQuery errors response', response);

      return createResponseErrors(response);
    },
    invalidatesTags: ['Course'],
  });

  return insertSeoQuery;
}
