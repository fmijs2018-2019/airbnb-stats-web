import { IFilters } from 'src/models/grid/filtersData';
import { IError } from 'src/models/Error';
import { IListingTableDto } from 'src/models/listings/ListingTableDto';
import { IListing } from 'src/models/listings/Listing';

export interface IListingsGridState extends IFilters {
    fetchFiltersDataError: IError | null,
    fetchListingsError: IError | null,
    listings: IListing[] | null,
    pageSize: number,
    currentPage: number,
    orderBy: string,
    order: 'asc' | 'desc',
    fromDate?: Date,
    toDate?: Date,
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