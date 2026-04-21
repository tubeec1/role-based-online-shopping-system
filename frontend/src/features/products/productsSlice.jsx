import { createSlice } from "@reduxjs/toolkit";
let productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    loading: false,
    selectedProduct: null,
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload.products;
    },
    setLoading: (state, action) => {
      state.loading = action.payload.loading;
    },
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload.selectedProduct;
    },
  },
});

export const { setProducts, setLoading, setSelectedProduct } =
  productsSlice.actions;
export default productsSlice.reducer;
