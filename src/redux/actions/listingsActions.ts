import { Dispatch } from 'redux';
import { IError } from 'src/models/Error';
import { IListingLocation } from 'src/models/listings/ListingLocation';
import { IReduxAction } from '../../models/ReduxAction';
import { isFetching } from './commonActions';
import listingsApiClient from '../../api/listingsApi';
import * as _ from 'lodash';
import { IListingDetailed } from 'src/models/listings/Listing';

export const FETCH_LOCATIONS_SUCCESS = 'FETCH_LOCATIONS_SUCCESS';
export const FETCH_LOCATIONS_ERROR = 'FETCH_LOCATIONS_ERROR';

export const fetchLocations = () => {
    return function (dispatch: Dispatch): Promise<IListingLocation[]> {
        dispatch(isFetching(true));

        const promise = listingsApiClient.getLocations();

        promise
            .then((data: IListingLocation[]) => {
                dispatch(fetchLocationsSuccess(_.groupBy(data, 'ngId')));
                dispatch(isFetching(false));
            })
            .catch((error: IError) => {
                dispatch(fetchLocationsError(error));
                dispatch(isFetching(false));
            });

        return promise;
    }
};

export const fetchLocationsSuccess = (locations: _.Dictionary<IListingLocation[]>): IReduxAction => ({
    type: FETCH_LOCATIONS_SUCCESS,
    payload: locations,
});

export const fetchLocationsError = (error: IError): IReduxAction => ({
    type: FETCH_LOCATIONS_ERROR,
    payload: error,
});

export const FETCH_LISTING_DETAILED_SUCCESS = 'FETCH_LISTING_DETAILED_SUCCESS';
export const FETCH_LISTING_DETAILED_ERROR = 'FETCH_LISTING_DETAILED_ERROR';

export const fetchListingDetailed = (id: number | null) => {
    return function (dispatch: Dispatch): Promise<IListingDetailed> | void {
        if(!id) {
            dispatch(fetchListingDetailedSuccess(null));
            return;
        }

        const promise = listingsApiClient.getListingDetailed(id);

        promise
            .then(listing => dispatch(fetchListingDetailedSuccess(listing)))
            .catch(err => dispatch(fetchListingDetailedError(err)));

        return promise;
    }
};

export const fetchListingDetailedSuccess = (listing: IListingDetailed | null): IReduxAction => ({
    type: FETCH_LISTING_DETAILED_SUCCESS,
    payload: listing
});

export const fetchListingDetailedError = (error: IError): IReduxAction => ({
    type: FETCH_LISTING_DETAILED_ERROR,
    payload: error
});
