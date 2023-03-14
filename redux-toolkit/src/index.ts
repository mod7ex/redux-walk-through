import store , { dispatch } from './app/store';
import cakeSlice from './features/cake/slice';
import iceCreamSlice from './features/ice-cream/slice';

// console.log(store.getState());

const unsubscribe = store.subscribe(() => {
    // console.log(store.getState());
});

dispatch(cakeSlice.actions.order());
dispatch(cakeSlice.actions.order());
dispatch(cakeSlice.actions.restock(10));

dispatch(iceCreamSlice.actions.order());
dispatch(iceCreamSlice.actions.order());
dispatch(iceCreamSlice.actions.restock(10));

unsubscribe();