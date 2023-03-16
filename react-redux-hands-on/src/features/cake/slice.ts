import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import iceCreamSlice from '../ice-cream/slice'

const {order: iceCreamOrder} = iceCreamSlice.actions

export default createSlice({
  name: 'cake',

  initialState: { count: 10 },

  reducers: {
    order(state) {
      state.count--
    },
    
    restock(state, action: PayloadAction<number>) {
      state.count = action.payload
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(iceCreamOrder, (state) => {
        state.count--
      })
  },
})
