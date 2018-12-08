import { IListingLocation } from "src/models/listings/ListingLocation";
import { IError } from 'src/models/Error';

export interface IListingsState {
    locations: IListingLocation[] | null;
    fetchLocationsError: IError | null; 
}

export const initialListingsState: IListingsState = {
    locations: null,
    fetchLocationsError: null,
}
