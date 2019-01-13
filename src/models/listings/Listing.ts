import { IIdentifiable } from '../Identifiable';

export interface IListing extends IIdentifiable {
    name: string | null;
    street: string;
    neighborhood_overview: string | null;
    price: number;
    neighborhood: string;
    property_type: string;
    room_type: string;
    accommodates: number;
    rating: number | null;
};

export interface IRoomType extends IIdentifiable {
    type: string
};

export interface IPropertyType extends IIdentifiable {
    id: number,
    type: string
};
