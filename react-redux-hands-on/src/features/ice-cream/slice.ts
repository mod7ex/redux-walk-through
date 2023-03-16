import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit'

export const orderIceCreamAsync = createAsyncThunk(
  'ice-cream/async-order',
  (count: number, thunkAPI) => new Promise<number>((resolve, reject) => {

    setTimeout(() => {
      const is = Math.random() > .5;
      if(is) resolve(count);
      else reject('failed to order ice cream async');
    }, 3000)
  })
)

interface InitialState {count: number, error: unknown | null, pending: boolean };

const initialState: InitialState = { count: 10, error: null, pending: false };

export default createSlice({
  name: 'ice-cream',

  initialState,

  reducers: {
    order(state) {
      state.count--
    },
    
    restock(state, action: PayloadAction<number>) {
      state.count = action.payload
    },
  },

  extraReducers: builder => {
    builder
      .addCase(orderIceCreamAsync.pending, (state, action) => {
        state.pending = true;
      })
      .addCase(orderIceCreamAsync.fulfilled, (state, action) => {
        state.pending = false;
        state.count = action.payload;
        state.error = null;
      })
      .addCase(orderIceCreamAsync.rejected, (state, action) => {
        state.pending = false;
        state.error = action.error;
      });
  }
})
