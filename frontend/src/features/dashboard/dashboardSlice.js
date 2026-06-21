import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

/*
|--------------------------------------------------------------------------
| Dashboard Statistics
|--------------------------------------------------------------------------
*/

export const getDashboardStatistics = createAsyncThunk(
  "dashboard/getDashboardStatistics",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("/api/dashboard/statistics");

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  },
);

const dashboardSlice = createSlice({
  name: "dashboard",

  initialState: {
    statistics: null,
    loading: false,
    success: false,
    error: null,
  },

  reducers: {
    clearDashboardState: (state) => {
      state.success = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(getDashboardStatistics.pending, (state) => {
        state.loading = true;
      })

      .addCase(getDashboardStatistics.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.statistics = action.payload.data;
      })

      .addCase(getDashboardStatistics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearDashboardState } = dashboardSlice.actions;

export default dashboardSlice.reducer;
