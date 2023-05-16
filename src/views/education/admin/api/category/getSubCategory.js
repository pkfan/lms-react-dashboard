import createResponseErrors from '@/helpers/createResponseErrors';

export default function getSubCategory(builder) {
  const getSubCategoryQuery = builder.query({
    query: (subCategoryId) => {
      if (!subCategoryId) {
        throw new Error('skip request on null. [pkfan error]');
      }

      return {
        url: `/admin/subcategory/${subCategoryId}`,
        method: 'GET',
      };
    },
    transformResponse: (response) => {
      return response.data;
    },
    transformErrorResponse: (response) => {
      return createResponseErrors(response);
    },
    providesTags: ['Category'],
  });

  return getSubCategoryQuery;
}
