import { IListingLocation } from "src/models/listings/ListingLocation";
import { IError } from 'src/models/Error';

export interface ILocationsState {
    list: IListingLocation[] | null;
    neighborhoodFilter: string | null;
    fetchListError: IError | null; 
}

export const initialLocationsState: ILocationsState = {
    list: null,
    neighborhoodFilter: null,
    fetchListError: null,
}
