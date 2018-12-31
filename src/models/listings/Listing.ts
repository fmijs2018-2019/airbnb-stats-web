
export interface IListing {
    id: number;
    name: string | null;
    street: string;
    neighborhood_overview: string | null;
    price: number;
    neighborhood: string;
    property_type: string;
    room_type: string;
    accommodates: number;
    rating: number | null;
}