import { ILocationsState, initialLocationsState } from './state/locationsState';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './rootReducer';
import thunk from 'redux-thunk'
import { INeighborhoodsState, initialNeighborhoodsState } from './state/neighborhoodsState';
import { ICommonState, initialCommonState } from './state/commonState';
import { composeWithDevTools } from 'redux-devtools-extension';

export interface IApplicationState {
    locations: ILocationsState,
    neighborhoods: INeighborhoodsState,
    common: ICommonState
}

export const initialAppState: IApplicationState = {
    locations: initialLocationsState,
    neighborhoods: initialNeighborhoodsState,
    common: initialCommonState
}

export default createStore(
    rootReducer,
    initialAppState,
    composeWithDevTools(
        applyMiddleware(thunk),
    )
);

