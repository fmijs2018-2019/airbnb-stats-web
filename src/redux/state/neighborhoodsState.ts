import { INeighborhood } from 'src/models/neighborhoods/neighborhood';
import { IError } from 'src/models/Error';

export interface INeighborhoodsState {
    list: INeighborhood[] | null,
    fetchListError: IError | null
}

export const initialNeighborhoodsState: INeighborhoodsState = {
    list: null,
    fetchListError: null
}
