import { Dispatch } from 'redux';
import { getLocations } from 'src/api/listings';
import { IError } from 'src/models/Error';
import { IListingLocation } from 'src/models/listings/ListingLocation';
import { IReduxAction } from '../../models/ReduxAction';
import { isFetching } from './commonActions';
import * as _ from 'lodash';

export const FETCH_LOCATIONS_SUCCESS = 'FETCH_LOCATIONS_SUCCESS';
export const FETCH_LOCATIONS_ERROR = 'FETCH_LOCATIONS_ERROR';

export const fetchLocations = () => {
    return function (dispatch: Dispatch): Promise<IListingLocation[]> {
        dispatch(isFetching(true));

        const promise = getLocations();

        promise
            .then((data: IListingLocation[]) => {
                dispatch(fetchLocationsSuccess(_.groupBy(data, 'ngId'))) ;
                dispatch(isFetching(false));
            })
            .catch((error: IError) => {
                dispatch(fetchLocationsError(error));
                dispatch(isFetching(false));
            });

        return promise;
    }
}

export const fetchLocationsSuccess = (locations: _.Dictionary<IListingLocation[]>): IReduxAction => ({
    type: FETCH_LOCATIONS_SUCCESS,
    payload: locations,
})

export const fetchLocationsError = (error: IError): IReduxAction => ({
    type: FETCH_LOCATIONS_ERROR,
    payload: error,
})
