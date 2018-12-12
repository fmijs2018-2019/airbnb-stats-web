import { Dispatch, bindActionCreators } from 'redux';
import { getNeighborhoods } from 'src/api/neighborhoods';
import { IReduxAction } from 'src/models/ReduxAction';
import { IError } from 'src/models/Error';
import { INeighborhood } from 'src/models/neighborhoods/neighborhood';

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

export const neighborhoodsActions = {
    fetchNeighborhoods,
    fetchNeighborhoodsSuccess,
    fetchNeighborhoodsError
}

export interface INeighborhoodsActionsProps {
    fetchNeighborhoods: () => Promise<INeighborhood[]>;
    fetchNeighborhoodsSuccess: (neighborhoods: INeighborhood[]) => void;
    fetchNeighborhoodsError: (error: IError) => void;
}

export const bindNeighborhoodsActions = (dispatch: Dispatch): INeighborhoodsActionsProps => {
    return bindActionCreators({
        ...neighborhoodsActions
    }, dispatch) as any;
}
