import { Dispatch } from 'redux';
import { getLocations } from 'src/api/listings';
import { IError } from 'src/models/Error';
import { IListingLocation } from 'src/models/listings/ListingLocation';
import { IReduxAction } from '../../models/ReduxAction';
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

export const setNeighborhoodFilter = (filter: number | null = null): IReduxAction => ({
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
