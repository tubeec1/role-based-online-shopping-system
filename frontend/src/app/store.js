import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../features/auth/authSlice";
import categoryReducer from "../features/category/categorySlice";
import productReducer from "../features/products/productSlice";
import orderReducer from "../features/order/orderSlice";
import dashboardReducer from "../features/dashboard/dashboardSlice";
import cartReducer from "../features/cart/cartSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    categories: categoryReducer,
    products: productReducer,
    orders: orderReducer,
    dashboard: dashboardReducer,
    cart: cartReducer,
  },
});

export default store;
