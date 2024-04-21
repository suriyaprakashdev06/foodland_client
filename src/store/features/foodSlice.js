import { createSlice } from '@reduxjs/toolkit';

const state = {
    // loading: false,
    foods : {},
    categorieName : ''
}


export const foodSlice = createSlice({
    name: "foodSlice",
    initialState: state,
    reducers: {
        showAllFoods: (state, action) => {
            state.foods = action.payload;
        },
    }
});

export const { showAllFoods} = foodSlice.actions;

export default foodSlice.reducer;