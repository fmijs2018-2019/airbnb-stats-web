
export interface IListingTableDto {
    id: number;
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