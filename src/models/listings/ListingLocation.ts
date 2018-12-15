import { IIdentifiable } from '../Identifiable';

export interface IListingLocation extends IIdentifiable {
    longitude: number;
    latitude: number;
    roomTypeId: number;
}