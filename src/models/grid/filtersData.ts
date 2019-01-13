import { IPropertyType, IRoomType } from '../listings/Listing';
import { INeighborhood } from '../neighborhoods/neighborhood';

export interface IFiltersData {
    propertyTypes: IPropertyType[],
    roomTypes: IRoomType[],
    neighborhoods: INeighborhood[]
}