import { createSlice } from '@reduxjs/toolkit';

const state = {
    // loading: false,
    cart : [],
}


export const cartSlice = createSlice({
    name: "cartSlice",
    initialState: state,
    reducers: {
        showCartData: (state, action) => {
            state.cart = action.payload;
        },
    }
});

export const { showCartData} = cartSlice.actions;

export default cartSlice.reducer;