import { IIdentifiable } from '../Identifiable';

export interface IListingDetailed {
    id: number,
    url: string,
    name: string | null,
    description: string | null,
    neighborhoodOverview: string | null,
    transit: string | null,
    access: string | null,
    houseRules: null | null,
    pictureUrl: string | null,
    street: string | null,
    neighborhoodId: number,
    latitude: number,
    longitude: number,
    propertyTypeId: number,
    roomTypeId: number,
    accommodates: number,
    bathrooms: number | null,
    bedrooms: number | null,
    beds: number | null,
    price: number,
    weeklyPrice: number | null,
    mountlyPrice: number | null,
    minimumNights: number,
    maximumNights: number,
    availability: number,
    numberOfReviews: number,
    reviewScoresRating: number | null,
    reviewScoresAccuracy: number | null,
    reviewScoresCleanliness: number | null,
    reviewScoresCheckin: number | null,
    reviewScoresCommunication: number | null,
    reviewScoresLocation: number | null,
    reviewScoresValue: number | null,
    reviewsPerMonth: number | null,
    neighborhood: string,
    propertyType: string,
    roomType: string
}

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
