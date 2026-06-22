import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

/*
|--------------------------------------------------------------------------
| Get Categories
|--------------------------------------------------------------------------
*/

export const getCategories = createAsyncThunk(
  "categories/getCategories",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("/api/categories");

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || {
          message: "Something went wrong",
        },
      );
    }
  },
);

/*
|--------------------------------------------------------------------------
| Create Category
|--------------------------------------------------------------------------
*/

export const createCategory = createAsyncThunk(
  "categories/createCategory",
  async (formData, thunkAPI) => {
    try {
      const response = await api.post("/api/categories/create", formData, {
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
| Update Category
|--------------------------------------------------------------------------
*/

export const updateCategory = createAsyncThunk(
  "categories/updateCategory",
  async ({ id, formData }, thunkAPI) => {
    try {
      const response = await api.post(
        `/api/categories/update/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  },
);

/*
|--------------------------------------------------------------------------
| Delete Category
|--------------------------------------------------------------------------
*/

export const deleteCategory = createAsyncThunk(
  "categories/deleteCategory",
  async (id, thunkAPI) => {
    try {
      const response = await api.delete(`/api/categories/delete/${id}`);

      return {
        id,
        ...response.data,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  },
);

const categorySlice = createSlice({
  name: "categories",

  initialState: {
    categories: [],
    category: null,
    loading: false,
    success: false,
    error: null,
  },

  reducers: {
    clearCategoryState: (state) => {
      state.success = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      /*
      |--------------------------------------------------------------------------
      | Get Categories
      |--------------------------------------------------------------------------
      */

      .addCase(getCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload.data || [];
      })

      .addCase(getCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      /*
      |--------------------------------------------------------------------------
      | Create Category
      |--------------------------------------------------------------------------
      */

      .addCase(createCategory.pending, (state) => {
        state.loading = true;
      })

      .addCase(createCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        if (action.payload.data) {
          state.categories.unshift(action.payload.data);
        }
      })

      .addCase(createCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /*
      |--------------------------------------------------------------------------
      | Update Category
      |--------------------------------------------------------------------------
      */

      .addCase(updateCategory.pending, (state) => {
        state.loading = true;
      })

      .addCase(updateCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        const updatedCategory = action.payload.data;

        if (updatedCategory) {
          state.categories = state.categories.map((category) =>
            category.id === updatedCategory.id ? updatedCategory : category,
          );
        }
      })

      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /*
      |--------------------------------------------------------------------------
      | Delete Category
      |--------------------------------------------------------------------------
      */

      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
      })

      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        state.categories = state.categories.filter(
          (category) => category.id !== action.payload.id,
        );
      })

      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCategoryState } = categorySlice.actions;

export default categorySlice.reducer;
