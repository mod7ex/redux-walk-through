import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export default createSlice({
  name: 'ice-cream',

  initialState: { count: 10 },

  reducers: {
    order(state) {
      state.count--
    },
    
    restock(state, action: PayloadAction<number>) {
      state.count = action.payload
    },
  },
})
