import { IListingsGridState, initialListingsGridState } from '../state/listingsGridState';
import { IReduxAction } from 'src/models/ReduxAction';
import { FETCH_FILTERS_DATA_ERROR, FETCH_FILTERS_DATA_SUCCESS,
         SET_NEIGHBORHOODS_FILTER, SET_PROPERTY_TYPES_FILTER,
         SET_ROOM_TYPES_FILTER, FETCH_TABLE_DATA_SUCCESS,
         FETCH_TABLE_DATA_ERROR, SET_PAGE, SET_PAGE_SIZE, 
         CLEAR_FILTERS, SET_ORDER, SET_ORDERBY, SET_FROM_DATE, SET_TO_DATE, SET_FROM_PRICE, SET_TO_PRICE } from '../actions/listingsGridActions';

export const deepClone = (obj: object) => {
    return JSON.parse(JSON.stringify(obj));
}

export const listingsGridReducer = (state: IListingsGridState = initialListingsGridState, action: IReduxAction): IListingsGridState => {
    switch (action.type) {
        case FETCH_FILTERS_DATA_SUCCESS:
            return { ...state, ...action.payload, fetchFiltersDataError: null };
        case FETCH_FILTERS_DATA_ERROR:
            return { ...state, fetchFiltersDataError: action.payload, roomTypeFilter: {}, propertyTypeFilter: {}, neighborhoodFilter: {} };
        case SET_NEIGHBORHOODS_FILTER:
            const { id: ngId, checked: ngChecked } = action.payload;
            const ngFilter = deepClone(state.neighborhoodFilter);
            if (ngFilter[ngId]) {
                ngFilter[ngId].checked = ngChecked;
            }
            return { ...state, neighborhoodFilter: ngFilter };
        case SET_PROPERTY_TYPES_FILTER:
            const { id: ptId, checked: ptChecked } = action.payload;
            const ptFilter = deepClone(state.propertyTypeFilter);
            if (ptFilter[ptId]) {
                ptFilter[ptId].checked = ptChecked;
            }
            return { ...state, propertyTypeFilter: ptFilter };
        case SET_ROOM_TYPES_FILTER:
            const { id: rtId, checked: rtChecked } = action.payload;
            const rtFilter = deepClone(state.roomTypeFilter);
            if (rtFilter[rtId]) {
                rtFilter[rtId].checked = rtChecked;
            }
            return { ...state, roomTypeFilter: rtFilter };
        case SET_PAGE:
            return { ...state, currentPage: action.payload };
        case SET_PAGE_SIZE:
            return { ...state, pageSize: action.payload };
        case SET_ORDER:
            return { ...state, order: action.payload };
        case SET_ORDERBY:
            return { ...state, orderBy: action.payload };
        case SET_FROM_DATE:
            return { ...state, fromDate: action.payload };
        case SET_TO_DATE:
            return { ...state, toDate: action.payload };
        case SET_FROM_PRICE:
            return { ...state, fromPrice: action.payload };
        case SET_TO_PRICE:
            return { ...state, toPrice: action.payload };
        case CLEAR_FILTERS:
            let ngFilterNew = deepClone(state.neighborhoodFilter);
            let rtFilterNew = deepClone(state.roomTypeFilter);
            let ptFilterNew = deepClone(state.propertyTypeFilter);

            Object.keys(ngFilterNew).forEach(key => ngFilterNew[key].checked = false);
            Object.keys(rtFilterNew).forEach(key => rtFilterNew[key].checked = false);
            Object.keys(ptFilterNew).forEach(key => ptFilterNew[key].checked = false);

            return { ...state,
                    neighborhoodFilter: ngFilterNew,
                    roomTypeFilter: rtFilterNew,
                    propertyTypeFilter: ptFilterNew,
                    fromDate: undefined,
                    toDate: undefined,
                    fromPrice: undefined,
                    toPrice: undefined,
                    orderBy: '' };
        case FETCH_TABLE_DATA_SUCCESS:
            const { total_count, listings } = action.payload;
            let numberOfPages = Math.ceil(total_count / state.pageSize);
            if (numberOfPages < 0) {
                numberOfPages = 0;
            }
            return { ...state, listings, numberOfPages, totalCount: total_count };
        case FETCH_TABLE_DATA_ERROR:
            return { ...state, fetchListingsError: action.payload, listings: null, totalCount: 0, numberOfPages: 0, currentPage: 0 };
    }

    return state;
}
