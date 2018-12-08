import { IReduxAction } from '../../models/ReduxAction';
import { IListingsState, initialListingsState } from '../state/listingsState';
import { FETCH_LOCATIONS_SUCCESS, FETCH_LOCATIONS_ERROR } from '../actions/listingsActions';

export const listingsReducer = (state: IListingsState = initialListingsState, action: IReduxAction): IListingsState => {
    switch (action.type) {
        case FETCH_LOCATIONS_SUCCESS:
            return { ...state, locations: action.payload, fetchLocationsError: null };
        case FETCH_LOCATIONS_ERROR:
            return { ...state, fetchLocationsError: action.payload, locations: null };
    }

    return state;
}
