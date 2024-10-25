import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allProducts: [],
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    // ismai sare products set karunga
    setProducts: (state, action) => {
      state.allProducts = action.payload || [];
    },
    // ismai new products add karunga
    addProduct: (state, action) => {
      if (action.payload) state.allProducts.push(action.payload);
    },
    // ismai products id se filter karke update karunga
    updateProduct: (state, action) => {
      const { id, ...updatedData } = action.payload;
      const index = state.allProducts.findIndex((product) => product.id === id);
      if (index !== -1) {
        state.allProducts[index] = {
          ...state.allProducts[index],
          ...updatedData,
        };
      }
    },
  },
});

export const { setProducts, addProduct, updateProduct } = productsSlice.actions;

export default productsSlice.reducer;
