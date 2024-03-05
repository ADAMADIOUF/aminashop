import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from './Slices/apiSlice'
import cartSlice from './Slices/cartSlice'
import autSlice from './Slices/autSlice'
 const store = configureStore({
  reducer: {
   [apiSlice.reducerPath]:apiSlice.reducer,
   cart:cartSlice,
   auth:autSlice
  },
  middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(apiSlice.middleware),
  devTools:true
})
export default store
