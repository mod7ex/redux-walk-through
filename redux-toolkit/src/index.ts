import store , { dispatch } from './app/store';
import cakeSlice from './features/cake/slice';
import iceCreamSlice, { orderIceCreamAsync } from './features/ice-cream/slice';

/*
const red = cakeSlice.reducer;
const s = red({count: 20}, { type: 'cake/order' });
console.log(s)
*/

// console.log(store.getState());

const unsubscribe = store.subscribe(() => {
    // console.log(store.getState());
});

// dispatch(cakeSlice.actions.order());
// dispatch(cakeSlice.actions.order());
// dispatch(cakeSlice.actions.restock(10));

// dispatch(iceCreamSlice.actions.order());
// dispatch(iceCreamSlice.actions.order());
// dispatch(iceCreamSlice.actions.restock(10));

// dispatch(orderIceCreamAsync(500)) // Thunk action

unsubscribe();