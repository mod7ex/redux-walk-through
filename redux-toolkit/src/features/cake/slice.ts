import { createAction, createSlice, Action, AnyAction, type PayloadAction } from '@reduxjs/toolkit'

const incrementBy = createAction<number>('incrementBy')
const decrement = createAction('decrement')

interface RejectedAction extends Action {
  error: Error
}

function isRejectedAction(action: AnyAction): action is RejectedAction {
  return action.type.endsWith('rejected')
}

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

  // https://redux-toolkit.js.org/api/createSlice
  extraReducers: (builder) => {
    builder
      .addCase(incrementBy, (state, action) => {
        // action is inferred correctly here if using TS
      })
      // You can chain calls, or have separate `builder.addCase()` lines each time
      .addCase(decrement, (state, action) => {})
      // You can match a range of action types
      .addMatcher(
        isRejectedAction,
        // `action` will be inferred as a RejectedAction due to isRejectedAction being defined as a type guard
        (state, action) => {}
      )
      // and provide a default case if no other handlers matched
      .addDefaultCase((state, action) => {})
  },
})
