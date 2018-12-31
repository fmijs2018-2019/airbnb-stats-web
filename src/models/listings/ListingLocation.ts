import { IIdentifiable } from '../Identifiable';

export interface IListingLocation extends IIdentifiable {
    lon: number;
    lat: number;
    rId: number;
    ngId: number;
}