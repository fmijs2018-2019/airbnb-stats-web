import { IListingLocation } from "src/models/listings/ListingLocation";
import { IError } from 'src/models/Error';

export interface ILocationsState {
    list: _.Dictionary<IListingLocation[]> | null;
    fetchListError: IError | null; 
}

export const initialLocationsState: ILocationsState = {
    list: null,
    fetchListError: null,
}
