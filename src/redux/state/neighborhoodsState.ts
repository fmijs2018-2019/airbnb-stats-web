import { INeighborhood, IReportsData, INeighborhoodDetailed, INeighborhoodReport } from 'src/models/neighborhoods/neighborhood';
import { IError } from 'src/models/Error';

export interface INeighborhoodsState {
    detailedList: _.Dictionary<INeighborhoodDetailed> | null,
    ngReports: IReportsData | null,
    allReports: _.Dictionary<INeighborhoodReport> | null,
    fetchError: IError | null,
}

export const initialNeighborhoodsState: INeighborhoodsState = {
    detailedList: null,
    ngReports: null,
    allReports: null,
    fetchError: null
}
