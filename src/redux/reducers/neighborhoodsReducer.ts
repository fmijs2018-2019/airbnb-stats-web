import { INeighborhoodsState, initialNeighborhoodsState } from '../state/neighborhoodsState';
import { FETCH_NEIGHBORHOODS_DETAILED_SUCCESS, FETCH_NEIGHBORHOODS_ERROR, FETCH_NG_REPORTS_ERROR, FETCH_NG_REPORTS_SUCCESS, FETCH_ALL_REPORTS_SUCCESS, FETCH_ALL_REPORTS_ERROR } from '../actions/neighborhoodsActions';
import { IReduxAction } from '../../models/ReduxAction';

export const neighborhoodsReducer = (state: INeighborhoodsState = initialNeighborhoodsState, action: IReduxAction): INeighborhoodsState => {
    switch (action.type) {
        case FETCH_NEIGHBORHOODS_DETAILED_SUCCESS:
            return { ...state, detailedList: action.payload, fetchError: null };
        case FETCH_NEIGHBORHOODS_ERROR:
            return { ...state, detailedList: null, fetchError: action.payload };
        case FETCH_NG_REPORTS_SUCCESS:
            return { ...state, ngReports: action.payload, fetchError: null };
        case FETCH_NG_REPORTS_ERROR:
            return { ...state, ngReports: null, fetchError: action.payload };
        case FETCH_ALL_REPORTS_SUCCESS:
            return { ...state, allReports: action.payload, fetchError: null };
        case FETCH_ALL_REPORTS_ERROR:
            return { ...state, allReports: null, fetchError: action.payload };
    }

    return state;
}