import { IListingLocation } from 'src/models/listings/ListingLocation';
import { IFiltersData } from 'src/models/grid/filtersData';
import httpClient from './httpClient';

class ListingsApi {
    getLocations() {
        return httpClient.get<IListingLocation[]>('http://localhost:8080/listings/locations');
    }
    
    getFiltersData() {
        return httpClient.get<IFiltersData>('http://localhost:8080/listings/filters-data');
    }
}

const listingsApiClient = new ListingsApi();
export default listingsApiClient;
