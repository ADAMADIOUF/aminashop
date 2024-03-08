import { PRODUCTS_URL, UPLOAD_URL } from '../constants'

import { apiSlice } from './apiSlice'
export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ keyword, pageNumber }) => ({
        url: PRODUCTS_URL,
        params: {
          keyword,
          pageNumber,
        },
      }),
      providesTags: ['Product'],
      keepUnusedDataFor: 5,
    }),
    getProductsShoes: builder.query({
      query: () => ({
        url: `${PRODUCTS_URL}/shoes`,
      }),
      providesTags: ['Product'],
      keepUnusedDataFor: 5,
    }),
    getProductsClothing: builder.query({
      query: () => ({
        url: `${PRODUCTS_URL}/clothing`,
      }),
      providesTags: ['Product'],
      keepUnusedDataFor: 5,
    }),
    getProductsAccesory: builder.query({
      query: () => ({
        url: `${PRODUCTS_URL}/accesory`,
      }),
      providesTags: ['Product'],
      keepUnusedDataFor: 5,
    }),
    getProductsAfrican: builder.query({
      query: () => ({
        url: `${PRODUCTS_URL}/african`,
      }),
      providesTags: ['Product'],
      keepUnusedDataFor: 5,
    }),
    getproductDetail: builder.query({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    createProduct: builder.mutation({
      query: (productId) => ({
        url: PRODUCTS_URL,
        method: 'POST',
      }),

      invalidatesTags: ['Product'],
    }),
    updateProduct: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}/${data.productId}`,
        method: 'PUT',
        body: data,
      }),

      invalidatesTags: ['Product'],
    }),
    uploadProductImage: builder.mutation({
      query: (data) => ({
        url: `${UPLOAD_URL}`,
        method: 'POST',
        body: data,
      }),
    }),
    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
        method: 'DELETE',
      }),
    }),
    createReview: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}/${data.productId}/reviews`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Product'],
    }),
    deleteReview: builder.mutation({
      query: ({ productId, reviewId }) => ({
        url: `${PRODUCTS_URL}/${productId}/reviews/${reviewId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Product'],
    }),
    getTopProducts: builder.query({
      query: () => ({
        url: `${PRODUCTS_URL}/top`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
})
export const {useGetProductsQuery,
  useGetProductsShoesQuery,
  useGetProductsClothingQuery,
  useGetProductsAccesoryQuery,useGetProductsAfricanQuery,
 useGetproductDetailQuery,useCreateProductMutation,useUpdateProductMutation,useUploadProductImageMutation,useDeleteProductMutation,useCreateReviewMutation,
 useDeleteReviewMutation,useGetTopProductsQuery } = productApiSlice
