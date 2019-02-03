import { IIdentifiable } from '../Identifiable';

export interface INeighborhood extends IIdentifiable {
    name: string,
}
export interface INeighborhoodDetailed extends INeighborhood {
    geoJson: object,
    centerLatitude: number,
    centerLongitude: number,
    zoom: number
}

export interface IReportsData {
    byRoomType: ITypeReport[],
    byPropertyType: ITypeReport[],
}

export interface ITypeReport extends IIdentifiable {
    type: string,
    count: number
}

export interface IRatingReport {
    rating?: number;
    count: number;
}

export interface INeighborhoodReport extends IIdentifiable {
    name: string,
    byRoomType: ITypeReport[],
    byPropType: ITypeReport[],
    byRating: IRatingReport[],
}