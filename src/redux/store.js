import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./productsSlice.js";
import { api } from "./apiSlice.js";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
