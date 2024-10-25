import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setProducts, addProduct, updateProduct } from "./productsSlice";

// we can save this URL in some .env file
const BASE_URL = "https://fakestoreapi.com";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => "/products",
      providesTags: ["Products"],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setProducts(data));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    addProduct: builder.mutation({
      query: (product) => ({
        url: "/products",
        method: "POST",
        body: product,
      }),
      // invalidatesTags: ["Products"],
      // NOTE: invalidating does us nothing good because fakeapistore does not actually add product to there list to I update the store maually
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(addProduct(data));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    updateProduct: builder.mutation({
      query: ({ id, ...productData }) => ({
        url: `/products/${id}`,
        method: "PUT",
        body: productData,
      }),
      // invalidatesTags: ["Products"],
      // NOTE: again invalidating does us nothing good because fakeapistore does not actually update product to there list to I update the store maually
      async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(updateProduct({ id, ...data }));
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const {
  useGetProductsQuery,
  useAddProductMutation,
  useUpdateProductMutation,
} = api;
