import { IFiltersData } from 'src/models/grid/filtersData';
import { IError } from 'src/models/Error';
import { IListingTableDto } from 'src/models/listings/ListingTableDto';

export interface IListingsGridState {
    filtersData: IFiltersData | null,
    fetchFiltersDataError: IError | null,
    listings: IListingTableDto[] | null,
    take: number,
    skip: number,
    orderBy?: string,
    fromDate?: Date,
    toDate?: Date,
    neighs?: number[],
    propTypes?: number[],
    roomTypes?: number[],
}

export const initialListingsGridState: IListingsGridState = {
    filtersData: null,
    fetchFiltersDataError: null,
    listings: null,
    take: 5,
    skip: 0
}