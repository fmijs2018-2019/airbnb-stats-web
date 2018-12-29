import { INeighborhood, IReportsData } from 'src/models/neighborhoods/neighborhood';
import { IError } from 'src/models/Error';

export interface INeighborhoodsState {
    list: _.Dictionary<INeighborhood> | null,
    reports: IReportsData | null,
    fetchError: IError | null,
}

export const initialNeighborhoodsState: INeighborhoodsState = {
    list: null,
    reports: null,
    fetchError: null
}
