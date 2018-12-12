import { INeighborhoodsState, initialNeighborhoodsState } from '../state/neighborhoodsState';
import { IReduxAction } from 'src/models/ReduxAction';
import { FETCH_NEIGHBORHOODS_SUCCESS, FETCH_NEIGHBORHOODS_ERROR } from '../actions/neighborhoodsActions';

export const neighborhoodsReducer = (state: INeighborhoodsState = initialNeighborhoodsState, action: IReduxAction): INeighborhoodsState => {
    switch (action.type) {
        case FETCH_NEIGHBORHOODS_SUCCESS:
            return {...state, list: action.payload, fetchListError: null};
        case FETCH_NEIGHBORHOODS_ERROR:
            return {...state, list: null, fetchListError: action.payload};
    }

    return state;
}