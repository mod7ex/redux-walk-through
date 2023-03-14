import {bindActionCreators, combineReducers, createStore, applyMiddleware, type Middleware, type Action} from 'redux'

interface AnyAction<T, P = void> extends Action<T> {
    payload?: P
}

// -------------------------------------------- Actions
const ICE_CREAM_ORDER = 'ICE_CREAM_ORDER'
const ICE_CREAM_RESTOCKED = 'ICE_CREAM_RESTOCKED'
const CAKE_ORDER = 'CAKE_ORDER'
const CAKE_RESTOCKED = 'CAKE_RESTOCKED'

// -------------------------------------------- Action Creators
const iceCreamOrderAction = (): AnyAction<string> => ({
    type: ICE_CREAM_ORDER,
});

const cakeOrderAction = (): AnyAction<string> => ({
    type: CAKE_ORDER,
});

const iceCreamRestocked = (payload: number): AnyAction<string, number> => ({
    type: ICE_CREAM_RESTOCKED,
    payload
});

const cakeRestocked = (payload: number): AnyAction<string, number> => ({
    type: CAKE_RESTOCKED,
    payload
});

// -------------------------------------------- Initial states
const iceCreamInitialState = {
    count: 10
}

const cakeInitialState = {
    count: 10
}

// -------------------------------------------- Reducers
const iceCreamReducer = (state = iceCreamInitialState, action: AnyAction<string, any>) => {
    switch (action.type) {
        case ICE_CREAM_ORDER:
            return {
                count: state.count - 1
            }

        case ICE_CREAM_RESTOCKED:
            return {
                count: action.payload || 10
            }

        case CAKE_ORDER: // SAME ACTION IN BOTH REDUCERS (every reducer will dispatch it)
            return {
                count: state.count - 1
            }
    
        default:
            return state;
    }
}

const cakeReducer = (state = cakeInitialState, action: AnyAction<string, any>) => {
    switch (action.type) {
        case CAKE_ORDER: // SAME ACTION IN BOTH REDUCERS (every reducer will dispatch it)
            return {
                count: state.count - 1
            }

        case CAKE_RESTOCKED:
            return {
                count: action.payload || 10
            }
    
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    ice_cream: iceCreamReducer,
    cake: cakeReducer,
})

// -------------------------------------------- Middleware
const logger: Middleware = ({ getState, dispatch }) => {
    return next => action => {
    console.log('//////////////////////////////////////////////////////////')
      console.log('[ACTION TO DISPATCH]', action);
  
      console.log('[STATE BEFORE DISPATCH]', getState());

      // Call the next dispatch method in the middleware chain.
      const _value = next(action);
  
      console.log('[STATE AFTER DISPATCH]', getState());
  
      // This will likely be the action itself, unless
      // a middleware further in chain changed it.
      console.log('//////////////////////////////////////////////////////////')
      return _value; 
    }
}

// -------------------------------------------- Store
const store = createStore(
    rootReducer,
    applyMiddleware(logger)
)

console.log(store.getState())

const unsubscribe = store.subscribe(() => {
    console.log(store.getState())
});

/*
store.dispatch(iceCreamOrderAction())
store.dispatch(cakeOrderAction())
store.dispatch(iceCreamRestocked(20))
store.dispatch(cakeRestocked(20))
*/

const actions = bindActionCreators(
    {
        iceCreamOrderAction,
        iceCreamRestocked,
        cakeOrderAction,
        cakeRestocked,
    },
    store.dispatch
)

actions.iceCreamOrderAction()
actions.cakeOrderAction()
actions.iceCreamRestocked(20)
actions.cakeRestocked(20)

unsubscribe()