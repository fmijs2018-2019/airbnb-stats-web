import { IIdentifiable } from '../Identifiable';

export interface INeighborhood extends IIdentifiable {
    name: string,
    geoJson: object,
    centerLatitude: number,
    centerLongitude: number,
    zoom: number
}

export interface IReportsData {
    byRoomType: IDataUnit[],
    byPropertyType: IDataUnit[],
}

export interface IDataUnit {
    name: string | number,
    value: number
}