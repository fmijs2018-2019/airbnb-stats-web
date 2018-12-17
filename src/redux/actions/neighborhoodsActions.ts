import { Dispatch } from 'redux';
import { getNeighborhoods, getGeoJson } from 'src/api/neighborhoods';
import { IError } from 'src/models/Error';
import { INeighborhood } from 'src/models/neighborhoods/neighborhood';
import { IReduxAction } from 'src/models/ReduxAction';
import { IApplicationState } from '../store';

export const FETCH_NEIGHBORHOODS_SUCCESS = 'FETCH_NEIGHBORHOODS_SUCCESS';
export const FETCH_NEIGHBORHOODS_ERROR = 'FETCH_NEIGHBORHOODS_ERROR';

export const fetchNeighborhoods = () => {
    return function (dispatch: Dispatch): Promise<INeighborhood[]> {
        const promise = getNeighborhoods();

        promise
            .then((data: INeighborhood[]) => {
                dispatch(fetchNeighborhoodsSuccess(data))
            })
            .catch((error: IError) => {
                dispatch(fetchNeighborhoodsError(error))
            });

        return promise;
    }
}

export const fetchNeighborhoodsSuccess = (neighborhoods: INeighborhood[]): IReduxAction => ({
    type: FETCH_NEIGHBORHOODS_SUCCESS,
    payload: neighborhoods
})

export const fetchNeighborhoodsError = (error: IError): IReduxAction => ({
    type: FETCH_NEIGHBORHOODS_ERROR,
    payload: error
})

export const FETCH_ITEM_SUCCESS = 'FETCH_ITEM_SUCCESS';
export const FETCH_ITEM_ERROR = 'FETCH_ITEM_ERROR';

export const fetchNeighborhoodItem = () => {
    return function (dispatch: Dispatch, getState: () => IApplicationState): Promise<INeighborhood> {
        const filter = getState().locations.neighborhoodFilter;

        const promise = getGeoJson(filter);

        promise
            .then((data) => {
                dispatch(fetchItemSuccess(data));
            })
            .catch((error: IError) => {
                dispatch(fetchItemError(error));
            });

        return promise;
    }
}

export const fetchItemSuccess = (item: INeighborhood | null) => ({
    type: FETCH_ITEM_SUCCESS,
    payload: item
})

export const fetchItemError = (error: IError) => ({
    type: FETCH_ITEM_ERROR,
    payload: error
})
