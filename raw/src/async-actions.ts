import {
    createStore,
    applyMiddleware,
    type Middleware,
    type Action,
    type Reducer,
    type Dispatch
} from 'redux'
import thunk from 'redux-thunk'

interface AnyAction<T, P = void> extends Action<T> {
    payload?: P
}

interface IData {data: string}

// ---------- mock data fetching
const fetchData = (delay = 3000) => new Promise<IData>( (resolve, reject) => {
    setTimeout(() => {
        const chance = Math.random() > .5;
        if(chance)resolve({data: 'hello i am data'});
        else reject('request failed');
    }, delay);
})

// -------------------------------------------- Actions
const FETCH_DATA_REQUESTED = 'FETCH_DATA_REQUESTED';
const FETCH_DATA_SUCCEEDED = 'FETCH_DATA_SUCCEEDED';
const FETCH_DATA_FAILED = 'FETCH_DATA_FAILED';

// -------------------------------------------- Action Creators
const asyncStartLoading = (): AnyAction<string> => ({
    type: FETCH_DATA_REQUESTED,
});

const asyncSuccess = (payload: IData): AnyAction<string, IData> => ({
    type: FETCH_DATA_SUCCEEDED,
    payload
});

const asyncFailure = (payload: unknown): AnyAction<string, unknown> => ({
    type: FETCH_DATA_FAILED,
    payload
});

// --- thunk action creator
export function fetchDataThunkActionCreator(delay = 2000) {
    // @ts-ignore
    return (dispatch: Dispatch, _: () => any, { extraArgs }) => {
        console.log(extraArgs)

        dispatch(asyncStartLoading())

        fetchData(delay)
            .then((payload) => {
                dispatch(asyncSuccess(payload))
            }).catch(error => {
                dispatch(asyncFailure(error))
            });
    }
  }

// -------------------------------------------- Initial states
const initialState = {
    loading: false,
    data: null,
    error: null
}

// -------------------------------------------- Reducers
const reducer: Reducer = (state = initialState, action: AnyAction<string, any>) => {
    switch (action.type) {
        case FETCH_DATA_REQUESTED:
            return {
                ...state,
                loading: true
            }

        case FETCH_DATA_SUCCEEDED:
            return {
                loading: false,
                data: action.payload
            }

        case FETCH_DATA_FAILED:
            return {
                loading: false,
                error: action.payload
            }
    
        default:
            return state;
    }
}

// -------------------------------------------- Middleware
const logger: Middleware = ({ getState, dispatch }) => {
    return next => action => {
    console.log('START //////////////////////////////////////////////////////////')
      console.log('[ACTION TO DISPATCH]', action);
  
      console.log('[STATE BEFORE DISPATCH]', getState());

      if (typeof action === 'function') {
        console.log('END //////////////////////////////////////////////////////////\n\n')
        return action(dispatch, getState)
      }

      const _value = next(action);
  
      console.log('[STATE AFTER DISPATCH]', getState());
  
      // This will likely be the action itself, unless
      // a middleware further in chain changed it.
      console.log('END //////////////////////////////////////////////////////////\n\n')
      return _value; 
    }
}

// -------------------------------------------- Store
const store = createStore(
    reducer,
    applyMiddleware(
        thunk.withExtraArgument({ extraArgs: { arg: 200 } }),
        logger
    ) // Order is important
)

// @ts-ignore
store.dispatch(fetchDataThunkActionCreator(3000))