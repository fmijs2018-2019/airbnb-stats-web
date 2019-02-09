import { IListingLocation } from 'src/models/listings/ListingLocation';
import { IFiltersDataCollections } from 'src/models/grid/filtersData';
import httpClient from './httpClient';
import { IListing, IListingDetailed } from 'src/models/listings/Listing';
import { AxiosRequestConfig } from 'axios';

class ListingsApi {
    getLocations() {
        return httpClient.get<IListingLocation[]>('http://localhost:8080/listings/locations');
    }
    
    getFiltersData() {
        return httpClient.get<IFiltersDataCollections>('http://localhost:8080/listings/filters-data');
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

        return httpClient.get<{total_count: number, listings: IListing[]}>('http://localhost:8080/listings', config);
    }

    getListingDetailed(id: number) {
        return httpClient.get<IListingDetailed>(`http://localhost:8080/listings/${id}`);
    }
}

const listingsApiClient = new ListingsApi();
export default listingsApiClient;
