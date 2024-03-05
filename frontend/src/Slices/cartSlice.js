import { createSlice } from '@reduxjs/toolkit'
import { updateCart } from '../utils/cartUtils'

const initialState = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : {
      cartItems: [],
      shippingAddress: {},
      paymentMethod: 'PayPal,Cash on Delivery',
    }

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload
      const existItem = state.cartItems.find((x) => x._id === item._id)
      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? item : x
        )
      } else {
        state.cartItems = [...state.cartItems, item]
      }
      return updateCart(state)
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((x) => x._id !== action.payload)
      return updateCart(state)
    },
    savesShippingAddress: (state, action) => {
      state.shippingAddress = action.payload
      return updateCart(state)
    },
    savePaymentMethod: (state, action) => {
      const paymentMethod = action.payload
      state.paymentMethod = paymentMethod
      // If payment method is "Cash on Delivery", clear any existing shipping address
      if (paymentMethod === 'Cash on Delivery') {
        
      }
      return updateCart(state)
    },
    clearCartItems: (state, action) => {
      state.cartItems = []
      return updateCart(state)
    },
  },
})

export const {
  addToCart,
  removeFromCart,
  savesShippingAddress,
  savePaymentMethod,
  clearCartItems,
} = cartSlice.actions

export default cartSlice.reducer
