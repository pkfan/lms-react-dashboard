import createResponseErrors from '@/helpers/createResponseErrors';

export default function getCategories(builder) {
  const getCategoriesQuery = builder.query({
    query: ({ page, search }) => {
      let url = `/admin/course/categories?page=${page}`;
      if (search) {
        url = url + `&search=${search}`;
      }

      return {
        url: url,
        method: 'GET',
      };
    },
    transformResponse: (response) => {
      return response;
    },
    transformErrorResponse: (response) => {
      return createResponseErrors(response);
    },
    providesTags: ['Category'],
  });

  return getCategoriesQuery;
}
