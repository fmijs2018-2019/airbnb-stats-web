import { IReduxAction } from '../../models/ReduxAction';
import { IListingsState, initialListingsState } from '../state/listingsState';
import { FETCH_LOCATIONS_SUCCESS, FETCH_LOCATIONS_ERROR, FETCH_LISTING_DETAILED_SUCCESS, FETCH_LISTING_DETAILED_ERROR } from '../actions/listingsActions';

export const listingsReducer = (state: IListingsState = initialListingsState, action: IReduxAction): IListingsState => {
    switch (action.type) {
        case FETCH_LOCATIONS_SUCCESS:
            return { ...state, locations: action.payload, fetchListError: null };
        case FETCH_LOCATIONS_ERROR:
            return { ...state, fetchListError: action.payload, locations: null };
        case FETCH_LISTING_DETAILED_SUCCESS:
            return { ...state, item: action.payload, fetchListingError: null };
        case FETCH_LISTING_DETAILED_ERROR:
            return { ...state, item: null, fetchListingError: action.payload };
    }
    return state;
}
