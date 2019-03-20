import { IListing } from "../../models/listings/Listing";
import { IError } from "../../models/Error";
import { IFilters } from "../../models/grid/filtersData";

export interface IListingsGridState extends IFilters {
    fetchFiltersDataError: IError | null,
    fetchListingsError: IError | null,
    listings: IListing[] | null,
    pageSize: number,
    currentPage: number,
    orderBy: string,
    order: 'asc' | 'desc',
    fromDate?: string,
    toDate?: string,
    fromPrice?: number,
    toPrice?: number,
    totalCount: number,
    numberOfPages: number,
}

export const initialListingsGridState: IListingsGridState = {
    roomTypeFilter: {},
    propertyTypeFilter: {},
    neighborhoodFilter: {},
    fetchFiltersDataError: null,
    fetchListingsError: null,
    listings: null,
    pageSize: 5,
    currentPage: 0,
    totalCount: 0,
    numberOfPages: 0,
    orderBy: '',
    order: 'asc'
}