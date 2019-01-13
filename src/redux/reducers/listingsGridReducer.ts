import { IListingsGridState, initialListingsGridState } from '../state/listingsGridState';
import { IReduxAction } from 'src/models/ReduxAction';
import { FETCH_FILTERS_DATA_ERROR, FETCH_FILTERS_DATA_SUCCESS, SET_NEIGHBORHOODS_FILTER, CLEAR_NEIGHBORHOODS_FILTER, SET_PROPERTY_TYPES_FILTER, CLEAR_PROPERTY_TYPES_FILTER, SET_ROOM_TYPES_FILTER, CLEAR_ROOM_TYPES_FILTER } from '../actions/listingsGridActions';

export const listingsGridReducer = (state: IListingsGridState = initialListingsGridState, action: IReduxAction): IListingsGridState => {
    switch (action.type) {
        case FETCH_FILTERS_DATA_SUCCESS:
            return { ...state, filtersData: action.payload, fetchFiltersDataError: null };
        case FETCH_FILTERS_DATA_ERROR:
            return { ...state, fetchFiltersDataError: action.payload, filtersData: null };
        case SET_NEIGHBORHOODS_FILTER:
            return { ...state, neighs: action.payload };
        case CLEAR_NEIGHBORHOODS_FILTER:
            return { ...state, neighs: undefined };
        case SET_PROPERTY_TYPES_FILTER:
            return { ...state, propTypes: action.payload };
        case CLEAR_PROPERTY_TYPES_FILTER:
            return { ...state, propTypes: undefined };
        case SET_ROOM_TYPES_FILTER:
            return { ...state, roomTypes: action.payload };
        case CLEAR_ROOM_TYPES_FILTER:
            return { ...state, propTypes: undefined };
    }

    return state;
}
