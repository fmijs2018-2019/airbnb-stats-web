import { INeighborhoodsState, initialNeighborhoodsState } from '../state/neighborhoodsState';
import { IReduxAction } from 'src/models/ReduxAction';
import { FETCH_NEIGHBORHOODS_SUCCESS, FETCH_NEIGHBORHOODS_ERROR, FETCH_REPORTS_ERROR, FETCH_REPORTS_SUCCESS } from '../actions/neighborhoodsActions';

export const neighborhoodsReducer = (state: INeighborhoodsState = initialNeighborhoodsState, action: IReduxAction): INeighborhoodsState => {
    switch (action.type) {
        case FETCH_NEIGHBORHOODS_SUCCESS:
            return { ...state, list: action.payload, fetchError: null };
        case FETCH_NEIGHBORHOODS_ERROR:
            return { ...state, list: null, fetchError: action.payload };
        case FETCH_REPORTS_SUCCESS:
            return { ...state, reports: action.payload, fetchError: null};
        case FETCH_REPORTS_ERROR:
            return { ...state, reports: null, fetchError: action.payload};
    }

    return state;
}