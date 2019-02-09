import { IListingsState, initialListingsState } from './state/listingsState';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './rootReducer';
import thunk from 'redux-thunk'
import { INeighborhoodsState, initialNeighborhoodsState } from './state/neighborhoodsState';
import { ICommonState, initialCommonState } from './state/commonState';
import { composeWithDevTools } from 'redux-devtools-extension';
import { IListingsGridState, initialListingsGridState } from './state/listingsGridState';
import { IAuthState, initialAuthState } from './state/authState';

export interface IApplicationState {
    listings: IListingsState,
    neighborhoods: INeighborhoodsState,
    common: ICommonState,
    listingsGrid: IListingsGridState,
    auth: IAuthState,
}

export const initialAppState: IApplicationState = {
    listings: initialListingsState,
    neighborhoods: initialNeighborhoodsState,
    common: initialCommonState,
    listingsGrid: initialListingsGridState,
    auth: initialAuthState,
}

const store = createStore(
    rootReducer,
    initialAppState,
    composeWithDevTools(
        applyMiddleware(thunk),
    )
);

export default store;

