import { IIdentifiable } from '../Identifiable';

export interface IListingTableDto extends IIdentifiable {
    name: string | null;
    neighborhood: string;
    neighborhoodOverview: string | null;
    price: number;
    type: IListingType,
    accommodates: number;
    rating: number | null;
}

export interface IListingAddress {
    street: string;
    neighborhood: string;
}

export interface IListingType {
    propertyType: string;
    roomType: string;
}