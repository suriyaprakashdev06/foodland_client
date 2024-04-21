import { configureStore } from '@reduxjs/toolkit'
import homeSlice from './features/homeSlice'
import foodSlice from './features/foodSlice'
import cartSlice from './features/cartSlice'

export const store = configureStore({
  reducer: {
    home: homeSlice,
    foods : foodSlice,
    cart : cartSlice
  },
  devTools: true,
  middleware: (GetDefaultMiddleware) => 
  GetDefaultMiddleware({
    serializableCheck: false
  })
})