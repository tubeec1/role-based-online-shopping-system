import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice";
import cartSlice from "../features/cart/cartSlice";
import productsSlice from "../features/products/productsSlice";
let store = configureStore({
  reducer: {
    auth: authSlice,
    cart: cartSlice,
    products: productsSlice,
  },
});

export default store;
