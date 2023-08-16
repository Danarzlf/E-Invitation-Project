import { createSlice } from "@reduxjs/toolkit";

const passengerSlice = createSlice({
  name: "passenger",
  initialState: {
    adult: 1,
    children: 0,
    baby: 0,
  },
  reducers: {
    update: (state, action) => {
      state.adult = action.payload.adult;
      state.children = action.payload.children;
      state.baby = action.payload.baby;
    },
    incrementPassenger: (state, action) => {
      const { type } = action.payload;
      state[type]++;
    },
    decrementPassenger: (state, action) => {
      const { type } = action.payload;
      if (state[type] > 0) {
        state[type]--;
      }
    },
    decrementAdultPassenger: (state, action) => {
      const { type } = action.payload;
      if (state[type] > 1) {
        state[type]--;
      }
    },
  },
});

export const { update, incrementPassenger, decrementPassenger, decrementAdultPassenger } = passengerSlice.actions;
export default passengerSlice.reducer;
