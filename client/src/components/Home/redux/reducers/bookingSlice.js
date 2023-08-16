import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchDataBookingById, postDataBooking } from "../../../api/api";

export const fetchDataBookingByIdAsync = createAsyncThunk(
  "data/fetchDataBookingByIdAsync",
  async (id) => {
    const response = await fetchDataBookingById(id);
    return response.data;
  }
);

export const postDataBookingAsync = createAsyncThunk(
  "booking/postDataBookingAsync",
  async (data) => {
    const response = await postDataBooking(data);
    return response.data;
  }
);

const bookingSlice = createSlice({
  name: "booking",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDataBookingByIdAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDataBookingByIdAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchDataBookingByIdAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(postDataBookingAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postDataBookingAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(postDataBookingAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const selectData = (state) => state.booking.items;
export const selectLoading = (state) => state.booking.loading;
export const selectError = (state) => state.booking.error;
export default bookingSlice.reducer;
