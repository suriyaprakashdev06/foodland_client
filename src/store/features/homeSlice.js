import { createSlice } from '@reduxjs/toolkit';

const state = {
    loading: false,
}
export const homeSlice = createSlice({
    name: "homeSlice",
    initialState: state,
    reducers: {
        isLoading: (state, action) => {
            state.loading = action.payload;
        }
    }
});

export const { isLoading } = homeSlice.actions;

export default homeSlice.reducer;