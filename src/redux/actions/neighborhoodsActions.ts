import { Dispatch } from 'redux';
import { getNeighborhoods, getReports } from 'src/api/neighborhoods';
import { IError } from 'src/models/Error';
import { INeighborhood, IReportsData } from 'src/models/neighborhoods/neighborhood';
import { IReduxAction } from 'src/models/ReduxAction';
import { IApplicationState } from '../store';
import * as _ from 'lodash';

export const FETCH_NEIGHBORHOODS_SUCCESS = 'FETCH_NEIGHBORHOODS_SUCCESS';
export const FETCH_NEIGHBORHOODS_ERROR = 'FETCH_NEIGHBORHOODS_ERROR';

export const fetchNeighborhoods = () => {
    return function (dispatch: Dispatch): Promise<_.Dictionary<INeighborhood>> {
        const promise = getNeighborhoods();

        promise
            .then((data: _.Dictionary<INeighborhood>) => {
                dispatch(fetchNeighborhoodsSuccess(data))
            })
            .catch((error: IError) => {
                dispatch(fetchNeighborhoodsError(error))
            });

        return promise;
    }
}

export const fetchNeighborhoodsSuccess = (neighborhoods: _.Dictionary<INeighborhood>): IReduxAction => ({
    type: FETCH_NEIGHBORHOODS_SUCCESS,
    payload: neighborhoods
})

export const fetchNeighborhoodsError = (error: IError): IReduxAction => ({
    type: FETCH_NEIGHBORHOODS_ERROR,
    payload: error
})

export const FETCH_REPORTS_SUCCESS = 'FETCH_REPORTS_SUCCESS';
export const FETCH_REPORTS_ERROR = 'FETCH_REPORTS_ERROR';

export const fetchReports = (neighborhoodId: number) => {
    return function (dispatch: Dispatch): Promise<IReportsData> {
        const promise = getReports(neighborhoodId);

        promise
            .then((data) => {
                dispatch(fetchReportsSuccess(data));
            })
            .catch((error: IError) => {
                dispatch(fetchReportsError(error));
            });

        return promise;
    }
};

export const fetchReportsSuccess = (reports: IReportsData) => ({
    type: FETCH_REPORTS_SUCCESS,
    payload: reports
});

export const fetchReportsError = (error: IError) => ({
    type: FETCH_REPORTS_ERROR,
    payload: error
});
