import { IIdentifiable } from '../Identifiable';

export interface INeighborhood extends IIdentifiable{
    name: string
}

export interface INeighborhoodDetailed extends INeighborhood{
    geoJson: object,
    centerLatitude: number,
    centerLongitude: number
}