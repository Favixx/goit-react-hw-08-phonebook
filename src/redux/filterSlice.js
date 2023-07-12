import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    filter: ''
}
const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        getFilter(state, action) {
            state.filter = action.payload;
        },
    },
});

export const { getFilter } = filterSlice.actions;
export const filterReducer = filterSlice.reducer;