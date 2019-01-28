import { IPropertyType, IRoomType } from '../listings/Listing';
import { INeighborhood } from '../neighborhoods/neighborhood';

export interface IPropertyTypesFilter extends IPropertyType {
    checked: boolean
}

export interface IRoomTypeFilter extends IRoomType {
    checked: boolean
}

export interface INeighborhoodFilter extends INeighborhood {
    checked: boolean
}

export interface IFiltersDataCollections {
    propertyTypes: IPropertyType[],
    roomTypes: IRoomType[],
    neighborhoods: INeighborhood[]
}
export interface IFilters {
    propertyTypeFilter: { [id: string]: IPropertyTypesFilter },
    roomTypeFilter: { [id: string]: IRoomTypeFilter },
    neighborhoodFilter: { [id: string]: INeighborhoodFilter }
}