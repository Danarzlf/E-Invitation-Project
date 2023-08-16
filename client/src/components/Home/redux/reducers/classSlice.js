import { createSlice } from "@reduxjs/toolkit";

const classSlice = createSlice({
    name: "class",
    initialState: {
        nameClass: ['Economy', 'Premium Economy', 'Business', 'First Class'],
        selectedClass: 'Economy'
    },
    reducers: {
        update: (state, action) => {
            state.selectedClass = action.payload.selectedClass;
        }
    }
});

export const { update } = classSlice.actions;
export default classSlice.reducer;