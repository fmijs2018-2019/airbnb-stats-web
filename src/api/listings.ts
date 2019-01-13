import axios, { AxiosRequestConfig } from 'axios'
import { IListingLocation } from 'src/models/listings/ListingLocation';
import { IFiltersData } from 'src/models/grid/filtersData';

export const getLocations = function () {
    return axios.get<IListingLocation[]>('http://localhost:8080/listings/locations')
        .then((response) => response.data);
}

export const getFiltersData = () => {
    return axios.get<IFiltersData>('http://localhost:8080/listings/filters-data')
        .then((response) => response.data);
}