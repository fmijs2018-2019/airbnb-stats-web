import { IListingDetailed } from "../../models/listings/Listing";
import { IListingLocation } from "../../models/listings/ListingLocation";
import { IError } from "../../models/Error";

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
