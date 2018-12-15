import axios, { AxiosRequestConfig } from 'axios'
import { IListingLocation } from 'src/models/listings/ListingLocation';

export const getLocations = function (neighborhood: number | null = null) {
    const config: AxiosRequestConfig = { params: { neighborhood } };
    return axios.get<IListingLocation[]>('http://localhost:8080/listings/locations', config)
        .then((response) => response.data);
}