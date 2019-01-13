import { IFiltersData } from 'src/models/grid/filtersData';
import { Dispatch } from 'redux';
import { getFiltersData } from 'src/api/listings';
import { IReduxAction } from 'src/models/ReduxAction';
import { IError } from 'src/models/Error';
import { CONNREFUSED } from 'dns';

export const FETCH_FILTERS_DATA_SUCCESS = 'FETCH_FILTERS_DATA_SUCCESS';
export const FETCH_FILTERS_DATA_ERROR = 'FETCH_FILTERS_DATA_ERROR';

export const fetchFiltersData = () => {
    return function (dispatch: Dispatch): Promise<IFiltersData> {
        const promise = getFiltersData();

        promise
            .then((data: IFiltersData) => {
                dispatch(fetchFiltersDataSuccess(data));
            })
            .catch((error: IError) => {
                dispatch(fetchFiltersDataError(error))
            });

        return promise;
    }
};

export const fetchFiltersDataSuccess = (payload: IFiltersData): IReduxAction => ({
    type: FETCH_FILTERS_DATA_SUCCESS,
    payload
});

export const fetchFiltersDataError = (error: IError): IReduxAction => ({
    type: FETCH_FILTERS_DATA_ERROR,
    payload: error
});

export const SET_NEIGHBORHOODS_FILTER = 'SET_NEIGHBORHOODS_FILTER';
export const CLEAR_NEIGHBORHOODS_FILTER = 'CLEAR_NEIGHBORHOODS_FILTER';
export const SET_PROPERTY_TYPES_FILTER = 'SET_PROPERTY_TYPES_FILTER';
export const CLEAR_PROPERTY_TYPES_FILTER = 'CLEAR_PROPERTY_TYPES_FILTER';
export const SET_ROOM_TYPES_FILTER = 'SET_ROOM_TYPES_FILTER';
export const CLEAR_ROOM_TYPES_FILTER = 'CLEAR_ROOM_TYPES_FILTER';

export const setNeighborhoodsFilter = (filter: number[]): IReduxAction => ({
    type: SET_NEIGHBORHOODS_FILTER,
    payload: filter
});

export const clearNeighborhoodsFilter = (): IReduxAction => ({
    type: CLEAR_NEIGHBORHOODS_FILTER,
});

export const setRoomTypesFilter = (filter: number[]): IReduxAction => ({
    type: SET_ROOM_TYPES_FILTER,
    payload: filter
});

export const clearRoomTypesFilter = (): IReduxAction => ({
    type: CLEAR_ROOM_TYPES_FILTER,
});

export const setPropertyTypesFilter = (filter: number[]): IReduxAction => ({
    type: SET_PROPERTY_TYPES_FILTER,
    payload: filter
});

export const clearPropertyTypesFilter = (): IReduxAction => ({
    type: CLEAR_PROPERTY_TYPES_FILTER,
});

