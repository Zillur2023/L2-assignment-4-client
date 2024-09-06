import { baseApi } from "../../api/baseApi";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCategory: builder.mutation({
      query: (formData) => {
        return {
          url: "/category/create-category",
          method: "POST",
          body: formData,
        };
      },
      // Simple invalidation using 'Category' tag
      invalidatesTags: ['Category'],
    }),
    getAllCategories: builder.query({
      query: () => ({
        url: "/category",
        method: "GET",
      }),
      // Provides the 'Category' tag to the cache
      providesTags: ['Category'],
    }),
  }),
});

export const { useGetAllCategoriesQuery, useCreateCategoryMutation } = categoryApi;
