import { INeighborhoodsState, initialNeighborhoodsState } from '../state/neighborhoodsState';
import { IReduxAction } from 'src/models/ReduxAction';
import { FETCH_NEIGHBORHOODS_SUCCESS, FETCH_NEIGHBORHOODS_ERROR, FETCH_ITEM_SUCCESS, FETCH_ITEM_ERROR } from '../actions/neighborhoodsActions';

export const neighborhoodsReducer = (state: INeighborhoodsState = initialNeighborhoodsState, action: IReduxAction): INeighborhoodsState => {
    switch (action.type) {
        case FETCH_NEIGHBORHOODS_SUCCESS:
            return { ...state, list: action.payload, fetchError: null };
        case FETCH_NEIGHBORHOODS_ERROR:
            return { ...state, list: null, fetchError: action.payload };
        case FETCH_ITEM_SUCCESS:
            return {...state, item: action.payload, fetchError: null};
        case FETCH_ITEM_ERROR:
            return {...state, item: null, fetchError: action.payload};
    }

    return state;
}