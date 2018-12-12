import { IReduxAction } from '../../models/ReduxAction';
import { ILocationsState, initialLocationsState } from '../state/locationsState';
import { FETCH_LOCATIONS_SUCCESS, FETCH_LOCATIONS_ERROR, SET_NEIGHBORHOOD_FILTER } from '../actions/listingsActions';

export const locationsReducer = (state: ILocationsState = initialLocationsState, action: IReduxAction): ILocationsState => {
    switch (action.type) {
        case FETCH_LOCATIONS_SUCCESS:
            return { ...state, list: action.payload, fetchListError: null };
        case FETCH_LOCATIONS_ERROR:
            return { ...state, fetchListError: action.payload, list: null };
        case SET_NEIGHBORHOOD_FILTER:
            return { ...state, neighborhoodFilter: action.payload };
    }

    return state;
}
