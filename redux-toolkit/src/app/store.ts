import {
    configureStore,
    type Middleware,
    type Dispatch,
    type AnyAction,
    type Action
} from '@reduxjs/toolkit'
import cakeSlice from '../features/cake/slice'
import iceCreamSlice from '../features/ice-cream/slice'

const logger: Middleware = ({ getState, dispatch }) => {
    return (next: Dispatch<AnyAction>) => action => {
        console.log('START //////////////////////////////////////////////////////////')
        console.log('///      [ACTION TO DISPATCH]', action);
    
        console.log('///      [STATE BEFORE DISPATCH]', getState());

        if (typeof action === 'function') {
            console.log('END //////////////////////////////////////////////////////////\n\n')
            return action(dispatch, getState)
        }

        const _value = next(action);
    
        console.log('///      [STATE AFTER DISPATCH]', getState());
    
        // This will likely be the action itself, unless
        // a middleware further in chain changed it.
        console.log('END //////////////////////////////////////////////////////////\n\n')
        return _value; 
    }
}

export const store = configureStore({
  reducer: {
    cake: cakeSlice.reducer,
    ice_cream: iceCreamSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([logger]),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const dispatch = store.dispatch

export default store