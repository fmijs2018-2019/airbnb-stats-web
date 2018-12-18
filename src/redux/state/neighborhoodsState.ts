import { INeighborhood, INeighborhoodDetailed } from 'src/models/neighborhoods/neighborhood';
import { IError } from 'src/models/Error';

export interface INeighborhoodsState {
    list: INeighborhood[] | null,
    item: INeighborhoodDetailed | null,
    fetchError: IError | null
}

export const initialNeighborhoodsState: INeighborhoodsState = {
    list: null,
    item: null,
    fetchError: null
}
