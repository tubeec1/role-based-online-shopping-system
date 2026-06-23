import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

/*
|--------------------------------------------------------------------------
| Create Order
|--------------------------------------------------------------------------
*/

export const createOrder = createAsyncThunk(
  "orders/createOrder",
  async (orderData, thunkAPI) => {
    try {
      const response = await api.post("/api/orders/create", orderData);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  },
);

/*
|--------------------------------------------------------------------------
| My Orders
|--------------------------------------------------------------------------
*/

export const getMyOrders = createAsyncThunk(
  "orders/getMyOrders",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("/api/orders/my-orders");

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  },
);

/*
|--------------------------------------------------------------------------
| Order Details
|--------------------------------------------------------------------------
*/

export const getOrderDetails = createAsyncThunk(
  "orders/getOrderDetails",
  async (id, thunkAPI) => {
    try {
      const response = await api.get(`/api/orders/show/${id}`);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  },
);

/*
|--------------------------------------------------------------------------
| All Orders
|--------------------------------------------------------------------------
*/

export const getAllOrders = createAsyncThunk(
  "orders/getAllOrders",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("/api/orders");

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  },
);

/*
|--------------------------------------------------------------------------
| Update Order Status
|--------------------------------------------------------------------------
*/

export const updateOrderStatus = createAsyncThunk(
  "orders/updateOrderStatus",
  async ({ id, status }, thunkAPI) => {
    try {
      const response = await api.post(`/api/orders/update-status/${id}`, {
        status,
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  },
);

const orderSlice = createSlice({
  name: "orders",

  initialState: {
    orders: [],
    order: null,
    loading: false,
    success: false,
    error: null,
  },

  reducers: {
    clearOrderState: (state) => {
      state.success = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      /*
      |--------------------------------------------------------------------------
      | Create Order
      |--------------------------------------------------------------------------
      */

      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.order = action.payload.data;
      })

      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to create order";
      })

      /*
      |--------------------------------------------------------------------------
      | My Orders
      |--------------------------------------------------------------------------
      */

      .addCase(getMyOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getMyOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.data || [];
      })

      .addCase(getMyOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to load orders";
      })

      /*
      |--------------------------------------------------------------------------
      | Order Details
      |--------------------------------------------------------------------------
      */

      .addCase(getOrderDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload.data;
      })

      .addCase(getOrderDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to load order";
      })

      /*
      |--------------------------------------------------------------------------
      | Get All Orders
      |--------------------------------------------------------------------------
      */

      .addCase(getAllOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.data || [];
      })

      .addCase(getAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to load orders";
      })

      /*
      |--------------------------------------------------------------------------
      | Update Order Status
      |--------------------------------------------------------------------------
      */

      .addCase(updateOrderStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        const updatedOrder = action.payload?.data;

        if (updatedOrder) {
          state.orders = state.orders.map((order) =>
            order.order_id === updatedOrder.order_id
              ? {
                  ...order,
                  status: updatedOrder.status,
                }
              : order,
          );
        }
      })

      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to update order";
      });
  },
});

export const { clearOrderState } = orderSlice.actions;

export default orderSlice.reducer;
