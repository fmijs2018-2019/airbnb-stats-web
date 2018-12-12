import { IListingLocation } from 'src/models/listings/ListingLocation';
import { IReduxAction } from '../../models/ReduxAction';
import { IError } from 'src/models/Error';
import { bindActionCreators, Dispatch } from 'redux';
import { getLocations } from 'src/api/listings';
import { IApplicationState } from '../store';
import { isFetching } from './commonActions';

export const FETCH_LOCATIONS_SUCCESS = 'FETCH_LOCATIONS_SUCCESS';
export const FETCH_LOCATIONS_ERROR = 'FETCH_LOCATIONS_ERROR';
export const SET_NEIGHBORHOOD_FILTER = 'SET_NEIGHBORHOOD_FILTER';

export const fetchLocations = () => {
    return function (dispatch: Dispatch, getState: () => IApplicationState): Promise<IListingLocation[]> {
        dispatch(isFetching(true));

        const filter = getState().locations.neighborhoodFilter;
        const promise = getLocations(filter);

        promise
            .then((data: IListingLocation[]) => {
                dispatch(fetchLocationsSuccess(data));
                dispatch(isFetching(false));
            })
            .catch((error: IError) => {
                dispatch(fetchLocationsError(error));
                dispatch(isFetching(false));
            });

        return promise;
    }
}

export const setNeighborhoodFilter = (filter: string): IReduxAction => ({
    type: SET_NEIGHBORHOOD_FILTER,
    payload: filter
})

export const fetchLocationsSuccess = (locations: IListingLocation[]): IReduxAction => ({
    type: FETCH_LOCATIONS_SUCCESS,
    payload: locations,
})

export const fetchLocationsError = (error: IError): IReduxAction => ({
    type: FETCH_LOCATIONS_ERROR,
    payload: error,
})

export const listingActions = {
    fetchLocations,
    fetchLocationsSuccess,
    fetchLocationsError,
    setNeighborhoodFilter,
}

export interface IListingActionsProps {
    fetchLocations: () => Promise<IListingLocation[]>;
    fetchLocationsSuccess: (locations: IListingLocation[]) => void;
    fetchLocationsError: (error: IError) => void;
    setNeighborhoodFilter: (filter: string) => void;
}

export const bindListingActions = (dispatch: Dispatch): IListingActionsProps => {
    return bindActionCreators({
        ...listingActions
    }, dispatch) as any;
}
