import { IListingLocation } from 'src/models/listings/ListingLocation';
import axios from 'axios';
import { IReduxAction } from '../../models/ReduxAction';
import { IError } from 'src/models/Error';
import { bindActionCreators, Dispatch } from 'redux';

export const FETCH_LOCATIONS_SUCCESS = "FETCH_LOCATIONS_SUCCESS";
export const FETCH_LOCATIONS_ERROR = "FETCH_LOCATIONS_ERROR";

export const fetchLocations = () => {
    return function(dispatch: Dispatch): Promise<IListingLocation[]> {
        const promise = axios.get<IListingLocation[]>('http://localhost:8080/listings/locations')
            .then((response) => response.data);

        promise
            .then((data: IListingLocation[]) => {
                dispatch(fetchLocationsSuccess(data))
            })
            .catch((error: IError) => {
                dispatch(fetchLocationsError(error))
            });

        return promise;
    }
}

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
}

export interface IListingActionsProps {
    fetchLocations: () => Promise<IListingLocation[]>;
    fetchLocationsSuccess: (locations: IListingLocation[]) => void;
    fetchLocationsError: (error: IError) => void;
}

export const bindListingActions = (dispatch: Dispatch): IListingActionsProps => {
    return bindActionCreators({
        ...listingActions
    }, dispatch) as any;
}
