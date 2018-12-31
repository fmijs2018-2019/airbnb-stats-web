import axios, { AxiosRequestConfig } from 'axios'
import { IListingLocation } from 'src/models/listings/ListingLocation';

export const getLocations = function () {
    return axios.get<_.Dictionary<IListingLocation[]>>('http://localhost:8080/listings/locations')
        .then((response) => response.data);
}