import createResponseErrors from '@/helpers/createResponseErrors';

export default function deleteSubCategory(builder) {
  const deleteSubCategoryQuery = builder.mutation({
    query: ({ subCategoryId }) => ({
      url: `/admin/course/subcategory/delete/${subCategoryId}`,
      method: 'POST',
      data: {},
    }),
    transformResponse: (response) => {
      console.log('deleteSubCategoryQuery response', response);
      return response.data;
    },
    transformErrorResponse: (response) => {
      console.log('deleteSubCategoryQuery errors response', response);

      return createResponseErrors(response);
    },
    invalidatesTags: ['Category'],
  });

  return deleteSubCategoryQuery;
}
