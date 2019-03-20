import { Dispatch } from 'redux';
import listingsApiClient from '../../api/listingsApi';
import { IApplicationState } from '../store';
import { IListing } from '../../models/listings/Listing';
import { IError } from '../../models/Error';
import { IReduxAction } from '../../models/ReduxAction';
import { IFiltersDataCollections, IFilters } from '../../models/grid/filtersData';

export const FETCH_TABLE_DATA_SUCCESS = 'FETCH_TABLE_DATA_SUCCESS';
export const FETCH_TABLE_DATA_ERROR = 'FETCH_TABLE_DATA_ERROR';

export const orderByDictionary: {[ordering: string]: number} = {
    'price_asc': 1,
    'accommodates_asc': 2,
    'rating_asc': 3,
    'price_desc': 4,
    'accommodates_desc': 5,
    'rating_desc': 6
}

export const fetchTableData = () => {
    return function (dispatch: Dispatch, getState: () => IApplicationState): Promise<{total_count: number, listings: IListing[]}> {
        const { currentPage, pageSize, propertyTypeFilter, roomTypeFilter, neighborhoodFilter, fromDate, toDate, fromPrice, toPrice, orderBy, order } = getState().listingsGrid;
        const take = pageSize;
        const skip = currentPage * pageSize;
        const propTypes = Object.keys(propertyTypeFilter)
            .filter(key => propertyTypeFilter[key].checked)
            .map(id => +id);
        const roomTypes = Object.keys(roomTypeFilter)
            .filter(key => roomTypeFilter[key].checked)
            .map(id => +id);
        const ngs = Object.keys(neighborhoodFilter)
            .filter(key => neighborhoodFilter[key].checked)
            .map(id => +id);
        const ord = orderByDictionary[`${orderBy}_${order}`] || 0;

        const promise = listingsApiClient.getAllListings(skip, take, ngs, propTypes, roomTypes, fromDate, toDate, fromPrice, toPrice, ord);

        promise.then((data: {total_count: number, listings: IListing[]}) => {
            dispatch(fetchTableDataSuccess(data));
        }).catch((err: IError) => {
            dispatch(fetchTableDataError(err));
        });

        return promise;
    }
}

export const fetchTableDataSuccess = (data: {total_count: number, listings: IListing[]}): IReduxAction => ({
    type: FETCH_TABLE_DATA_SUCCESS,
    payload: data
});

export const fetchTableDataError = (error: IError): IReduxAction => ({
    type: FETCH_TABLE_DATA_ERROR,
    payload: error
});

export const FETCH_FILTERS_DATA_SUCCESS = 'FETCH_FILTERS_DATA_SUCCESS';
export const FETCH_FILTERS_DATA_ERROR = 'FETCH_FILTERS_DATA_ERROR';

export const fetchFiltersData = () => {
    return function (dispatch: Dispatch): Promise<IFiltersDataCollections> {
        const promise = listingsApiClient.getFiltersData();

        promise
            .then((data: IFiltersDataCollections) => {
                let filters: IFilters = {
                    roomTypeFilter: {},
                    propertyTypeFilter: {},
                    neighborhoodFilter: {}
                };

                data.roomTypes.forEach(rt => {
                    filters.roomTypeFilter[rt.id.toString()] = { ...rt, checked: false }
                });
                data.propertyTypes.forEach(pt => {
                    filters.propertyTypeFilter[pt.id.toString()] = { ...pt, checked: false }
                });
                data.neighborhoods.forEach(ng => {
                    filters.neighborhoodFilter[ng.id.toString()] = { ...ng, checked: false }
                })

                dispatch(fetchFiltersDataSuccess(filters));
            })
            .catch((error: IError) => {
                dispatch(fetchFiltersDataError(error))
            });

        return promise;
    }
};

export const fetchFiltersDataSuccess = (payload: IFilters): IReduxAction => ({
    type: FETCH_FILTERS_DATA_SUCCESS,
    payload
});

export const fetchFiltersDataError = (error: IError): IReduxAction => ({
    type: FETCH_FILTERS_DATA_ERROR,
    payload: error
});

export const SET_NEIGHBORHOODS_FILTER = 'SET_NEIGHBORHOODS_FILTER';
export const SET_PROPERTY_TYPES_FILTER = 'SET_PROPERTY_TYPES_FILTER';
export const SET_ROOM_TYPES_FILTER = 'SET_ROOM_TYPES_FILTER';
export const SET_PAGE_SIZE = 'SET_PAGE_SIZE';
export const SET_PAGE = 'SET_PAGE';
export const SET_ORDER = 'SET_ORDER';
export const SET_ORDERBY = 'SET_ORDERBY';
export const SET_FROM_DATE = 'SET_FROM_DATE';
export const SET_TO_DATE = 'SET_TO_DATE';
export const SET_FROM_PRICE = 'SET_FROM_PRICE';
export const SET_TO_PRICE = 'SET_TO_PRICE';
export const CLEAR_FILTERS = 'CLEAR_FILTERS';

export const setNeighborhoodsFilter = (id: string, checked: boolean): IReduxAction => ({
    type: SET_NEIGHBORHOODS_FILTER,
    payload: { id, checked }
});

export const setRoomTypesFilter = (id: string, checked: boolean): IReduxAction => ({
    type: SET_ROOM_TYPES_FILTER,
    payload: { id, checked }
});

export const setPropertyTypesFilter = (id: string, checked: boolean): IReduxAction => ({
    type: SET_PROPERTY_TYPES_FILTER,
    payload: { id, checked }
});

export const setPage = (page: number): IReduxAction => ({
    type: SET_PAGE,
    payload: page
});

export const setPageSize = (size: number): IReduxAction => ({
    type: SET_PAGE_SIZE,
    payload: size
});

export const setOrder = (order: 'desc' | 'asc'): IReduxAction => ({
    type: SET_ORDER,
    payload: order
});

export const setOrderBy = (orderBy: string): IReduxAction => ({
    type: SET_ORDERBY,
    payload: orderBy
});

export const setFromDate = (date: string): IReduxAction => ({
    type: SET_FROM_DATE,
    payload: date
});

export const setToDate = (date: string): IReduxAction => ({
    type: SET_TO_DATE,
    payload: date
});

export const setFromPrice = (price: number): IReduxAction => ({
    type: SET_FROM_PRICE,
    payload: price
});

export const setToPrice = (price: number): IReduxAction => ({
    type: SET_TO_PRICE,
    payload: price
});

export const clearFilters = (): IReduxAction => ({
    type: CLEAR_FILTERS,
});
