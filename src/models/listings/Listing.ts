import { IIdentifiable } from '../Identifiable';

export interface IListing extends IIdentifiable {
    name: string | null;
    street: string;
    neighborhood_overview: string | null;
    price: number;
    neighborhood: string;
    propertytype: string;
    roomtype: string;
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
