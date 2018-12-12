import { IReduxAction } from 'src/models/ReduxAction';
import { ICommonState, initialCommonState } from '../state/commonState';
import { IS_FETCHING } from '../actions/commonActions';

export const commonReducer = (state: ICommonState = initialCommonState, action: IReduxAction): ICommonState => {
    switch(action.type){
        case IS_FETCHING:
            return {...state, isFetching: action.payload};
    }

    return state;
}