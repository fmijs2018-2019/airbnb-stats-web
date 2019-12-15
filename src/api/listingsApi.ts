import httpClient from './httpClient';
import { AxiosRequestConfig } from 'axios';
import { IFiltersDataCollections } from '../models/grid/filtersData';
import { IListingLocation } from '../models/listings/ListingLocation';
import { IListing, IListingDetailed } from '../models/listings/Listing';

export const apiBaseUrl = 'https://airbnb-api.azurewebsites.net'
class ListingsApi {
    getLocations() {
        return httpClient.get<IListingLocation[]>(apiBaseUrl + '/listings/locations');
    }
    
    getFiltersData() {
        return httpClient.get<IFiltersDataCollections>(apiBaseUrl + '/listings/filters-data');
    }

    getAllListings(skip: number, take: number, ngs?: number[], propTypes?: number[], roomTypes?: number[], fromDate?: string, toDate?: string, fromPrice?: number, toPrice?: number, orderBy?: number) {
        const config: AxiosRequestConfig = {
            params: {skip, take}
        }

        if(orderBy) {
            config.params['order_by'] = orderBy;
        }

        if(ngs && ngs.length) {
            config.params['neighs'] = ngs.join(',');
        }

        if(propTypes && propTypes.length) {
            config.params['prop_types'] = propTypes.join(',');
        }

        if(roomTypes && roomTypes.length) {
            config.params['room_types'] = roomTypes.join(',');
        }

        if(fromDate && toDate) {
            config.params['from_date'] = fromDate;
            config.params['to_date'] = toDate;
        }

        if(fromPrice) {
            config.params['from_price'] = fromPrice;
        }

        if(toPrice) {
            config.params['to_price'] = toPrice;
        }

        return httpClient.get<{total_count: number, listings: IListing[]}>(apiBaseUrl + '/listings', config);
    }

    getListingDetailed(id: number) {
        return httpClient.get<IListingDetailed>(`${apiBaseUrl}/listings/${id}`);
    }
}

const listingsApiClient = new ListingsApi();
export default listingsApiClient;
