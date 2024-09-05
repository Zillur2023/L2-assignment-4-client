import { baseApi } from "../../api/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: (params) => ({
        url: "/product",
        method: "GET",
        params,
      }),
      providesTags: ['Product'], // This will tag the result with 'Product'
    }),
    getProductByCategory: builder.query({
      query: ({ category, filter }) => ({
        url: `/product/productByCategory/${category}`,
        method: "GET",
        params: filter,
      }),
      providesTags: ['Product'], // Also tagged with 'Product'
    }),
    createProduct: builder.mutation({
      query: (formData) => {
        return {
          url: "/product/create-product",
          method: "POST",
          body: formData,
        }
      },
      invalidatesTags: ['Product'], // Invalidates 'Product' tag to refetch queries
    }),
    updateProduct: builder.mutation({
      query: (product) => ({
        url: `/product/update/${product._id}`,
        method: 'PUT',
        body: product,
      }),
      invalidatesTags: ['Product'], // Invalidates 'Product' tag to refetch queries
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/product/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ['Product'], // Invalidates 'Product' tag to refetch queries
    }),
    maxPrice: builder.query({
      query: () => ({
        url: `/product/max-price`,
        method: "GET",
      }),
      providesTags: ['Product'], // Invalidates 'Product' tag to refetch queries
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductByCategoryQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useMaxPriceQuery
} = productApi;
