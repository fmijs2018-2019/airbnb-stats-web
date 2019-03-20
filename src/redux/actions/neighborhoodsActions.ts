import { Dispatch } from 'redux';
import neighborhoodsApiClient from '../../api/neighborhoodsApi';
import * as _ from 'lodash';
import { INeighborhoodDetailed, IReportsData, INeighborhoodReport } from '../../models/neighborhoods/neighborhood';
import { IError } from '../../models/Error';
import { IReduxAction } from '../../models/ReduxAction';

export const FETCH_NEIGHBORHOODS_DETAILED_SUCCESS = 'FETCH_NEIGHBORHOODS_DETAILED_SUCCESS';
export const FETCH_NEIGHBORHOODS_ERROR = 'FETCH_NEIGHBORHOODS_ERROR';

export const fetchNeighborhoodsDetailed = () => {
    return function (dispatch: Dispatch): Promise<INeighborhoodDetailed[]> {
        const promise = neighborhoodsApiClient.getNeighborhoodsDetailed();

        promise
            .then((data: INeighborhoodDetailed[]) => {
                dispatch(fetchNeighborhoodsDetailedSuccess(_.keyBy(data, 'id')))
            })
            .catch((error: IError) => {
                dispatch(fetchNeighborhoodsError(error))
            });

        return promise;
    }
}

export const fetchNeighborhoodsDetailedSuccess = (neighborhoods: _.Dictionary<INeighborhoodDetailed>): IReduxAction => ({
    type: FETCH_NEIGHBORHOODS_DETAILED_SUCCESS,
    payload: neighborhoods
});

export const fetchNeighborhoodsError = (error: IError): IReduxAction => ({
    type: FETCH_NEIGHBORHOODS_ERROR,
    payload: error
});

export const FETCH_NG_REPORTS_SUCCESS = 'FETCH_NG_REPORTS_SUCCESS';
export const FETCH_NG_REPORTS_ERROR = 'FETCH_NG_REPORTS_ERROR';

export const fetchNeighborhoodReports = (neighborhoodId: number) => {
    return function (dispatch: Dispatch): Promise<IReportsData> {
        const promise = neighborhoodsApiClient.getReports(neighborhoodId);

        promise
            .then((data) => {
                dispatch(fetchNgReportsSuccess(data));
            })
            .catch((error: IError) => {
                dispatch(fetchNgReportsError(error));
            });

        return promise;
    }
};

export const fetchNgReportsSuccess = (reports: IReportsData) => ({
    type: FETCH_NG_REPORTS_SUCCESS,
    payload: reports
});

export const fetchNgReportsError = (error: IError) => ({
    type: FETCH_NG_REPORTS_ERROR,
    payload: error
});

export const FETCH_ALL_REPORTS_SUCCESS = 'FETCH_ALL_REPORTS_SUCCESS';
export const FETCH_ALL_REPORTS_ERROR = 'FETCH_ALL_REPORTS_ERROR';

export const fetchAllReports = () => {
    return function (dispatch: Dispatch): Promise<INeighborhoodReport[]> {
        const promise = neighborhoodsApiClient.getAllReports();

        promise
            .then((data) => {
                dispatch(fetchAllReportsSuccess(_.keyBy(data, 'id')));
            })
            .catch((error: IError) => {
                dispatch(fetchAllReportsError(error));
            });

        return promise;
    }
};

export const fetchAllReportsSuccess = (reports: _.Dictionary<INeighborhoodReport>) => ({
    type: FETCH_ALL_REPORTS_SUCCESS,
    payload: reports
});

export const fetchAllReportsError = (error: IError) => ({
    type: FETCH_ALL_REPORTS_ERROR,
    payload: error
});