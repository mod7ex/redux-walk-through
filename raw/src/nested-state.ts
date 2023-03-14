import {createStore, type AnyAction} from 'redux'
import {produce} from 'immer'

// -------------------------------------------- Actions
const STREET_UPDATE = 'STREET_UPDATE'

// -------------------------------------------- Action Creators
const streetUpdateAction = (payload: string) => ({
    type: STREET_UPDATE,
    payload
});

// -------------------------------------------- Initial states
const initialState = {
    name: 'Mourad',
    address: {
        street: 'sea',
        city: 'casablanca',
        state: 'CaSet'
    }
}

// -------------------------------------------- Reducers
const reducer = (state = initialState, action: AnyAction) => {
    switch (action.type) {
        case STREET_UPDATE:
        /*
            return {
                ...state,
                address: {
                    ...state.address,
                    street: action.payload
                }
            }
        */
        return produce(state, draft => {
                draft.address.street = action.payload
        })
    
        default:
            return state;
    }
}

// -------------------------------------------- Store
const store = createStore(reducer);

console.log(store.getState());

const unsubscribe = store.subscribe(() => {
    console.log(store.getState());
});

store.dispatch(streetUpdateAction('montana'));

unsubscribe();