import { IListingLocation } from "src/models/listings/ListingLocation";
import { IError } from 'src/models/Error';
import { IListingDetailed } from 'src/models/listings/Listing';

export interface IListingsState {
    locations: _.Dictionary<IListingLocation[]> | null;
    item: IListingDetailed | null;
    fetchListError: IError | null;
    fetchListingError: IError | null;
}

export const initialListingsState: IListingsState = {
    locations: null,
    item: null,
    fetchListError: null,
    fetchListingError: null,
}
