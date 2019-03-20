import { IReduxAction } from "../../models/ReduxAction";

export const IS_FETCHING = 'IS_FETCHING';

export const isFetching = (isFetching: boolean): IReduxAction => ({
    type: IS_FETCHING,
    payload: isFetching
})
