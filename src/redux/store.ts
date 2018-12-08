import { IListingsState, initialListingsState } from './state/listingsState';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './rootReducer';
import thunk from 'redux-thunk'

export interface IApplicationState {
    listings: IListingsState,
}

export const initialAppState: IApplicationState = {
    listings: initialListingsState,
}

export default createStore(
    rootReducer,
    initialAppState,
    applyMiddleware(thunk),
);
