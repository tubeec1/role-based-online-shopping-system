import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

/*
|--------------------------------------------------------------------------
| Get All Products
|--------------------------------------------------------------------------
*/

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("/api/products");

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  },
);

/*
|--------------------------------------------------------------------------
| Get Product By ID
|--------------------------------------------------------------------------
*/

export const getProductById = createAsyncThunk(
  "products/getProductById",
  async (id, thunkAPI) => {
    try {
      const response = await api.get(`/api/products/show/${id}`);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  },
);

/*
|--------------------------------------------------------------------------
| Search Products
|--------------------------------------------------------------------------
*/

export const searchProducts = createAsyncThunk(
  "products/searchProducts",
  async (keyword, thunkAPI) => {
    try {
      const response = await api.get(`/api/products/search?q=${keyword}`);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  },
);

/*
|--------------------------------------------------------------------------
| Products By Category
|--------------------------------------------------------------------------
*/

export const getProductsByCategory = createAsyncThunk(
  "products/getProductsByCategory",
  async (categoryName, thunkAPI) => {
    try {
      const response = await api.get(`/api/products/category/${categoryName}`);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  },
);

/*
|--------------------------------------------------------------------------
| Latest Products
|--------------------------------------------------------------------------
*/

export const getLatestProducts = createAsyncThunk(
  "products/getLatestProducts",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("/api/products/latest");

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  },
);

/*
|--------------------------------------------------------------------------
| Low Stock Products
|--------------------------------------------------------------------------
*/

export const getLowStockProducts = createAsyncThunk(
  "products/getLowStockProducts",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("/api/products/low-stock");

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  },
);

/*
|--------------------------------------------------------------------------
| Create Product
|--------------------------------------------------------------------------
*/

export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (formData, thunkAPI) => {
    try {
      const response = await api.post("/api/products/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  },
);

/*
|--------------------------------------------------------------------------
| Update Product
|--------------------------------------------------------------------------
*/

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, formData }, thunkAPI) => {
    try {
      const response = await api.post(`/api/products/update/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  },
);

/*
|--------------------------------------------------------------------------
| Delete Product
|--------------------------------------------------------------------------
*/

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id, thunkAPI) => {
    try {
      const response = await api.delete(`/api/products/delete/${id}`);

      return {
        id,
        ...response.data,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  },
);

const productSlice = createSlice({
  name: "products",

  initialState: {
    products: [],
    latestProducts: [],
    lowStockProducts: [],
    product: null,
    loading: false,
    success: false,
    error: null,
  },

  reducers: {
    clearProductState: (state) => {
      state.success = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      /*
      |--------------------------------------------------------------------------
      | Get Products
      |--------------------------------------------------------------------------
      */

      .addCase(getProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.data || [];
      })

      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /*
      |--------------------------------------------------------------------------
      | Get Product By ID
      |--------------------------------------------------------------------------
      */

      .addCase(getProductById.pending, (state) => {
        state.loading = true;
      })

      .addCase(getProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload.data;
      })

      .addCase(getProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /*
      |--------------------------------------------------------------------------
      | Search Products
      |--------------------------------------------------------------------------
      */

      .addCase(searchProducts.fulfilled, (state, action) => {
        state.products = action.payload.data || [];
      })

      /*
      |--------------------------------------------------------------------------
      | Products By Category
      |--------------------------------------------------------------------------
      */

      .addCase(getProductsByCategory.fulfilled, (state, action) => {
        state.products = action.payload.data || [];
      })

      /*
      |--------------------------------------------------------------------------
      | Latest Products
      |--------------------------------------------------------------------------
      */

      .addCase(getLatestProducts.fulfilled, (state, action) => {
        state.latestProducts = action.payload.data || [];
      })

      /*
      |--------------------------------------------------------------------------
      | Low Stock Products
      |--------------------------------------------------------------------------
      */

      .addCase(getLowStockProducts.fulfilled, (state, action) => {
        state.lowStockProducts = action.payload.data || [];
      })

      /*
      |--------------------------------------------------------------------------
      | Create Product
      |--------------------------------------------------------------------------
      */

      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(createProduct.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })

      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /*
      |--------------------------------------------------------------------------
      | Update Product
      |--------------------------------------------------------------------------
      */

      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(updateProduct.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })

      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /*
      |--------------------------------------------------------------------------
      | Delete Product
      |--------------------------------------------------------------------------
      */

      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
      })

      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;

        state.products = state.products.filter(
          (product) => product.id !== action.payload.id,
        );
      })

      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearProductState } = productSlice.actions;

export default productSlice.reducer;
