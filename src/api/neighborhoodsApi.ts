import httpClient from './httpClient';
import { INeighborhoodDetailed, IReportsData, INeighborhoodReport, INeighborhood } from '../models/neighborhoods/neighborhood';
import INeghborhoodReportByAllTypesOfRatingDto from '../dtos/INeighborhoodReportByAllTypesOfRatingDto';
import INeighborhoodPriceReport from '../dtos/INeighborhoodPriceReport';
import INeighborhoodAvailabilityReport from '../dtos/INeighborhoodAvailabilityReport';
import { apiBaseUrl } from './listingsApi';

class neighborhoodsApi {
    getNeighborhoodsDetailed() {
        return httpClient.get<INeighborhoodDetailed[]>(apiBaseUrl + '/neighborhoods');
    }

    getReports(id: number) {
        return httpClient.get<IReportsData>(`${apiBaseUrl}/neighborhoods/${id}/reports`);
    }

    getAllReports() {
        return httpClient.get<INeighborhoodReport[]>(apiBaseUrl + '/neighborhoods/reports');
	}
	
	getAllNeighborhoodsSimple(){
		return httpClient.get<INeighborhood[]>(apiBaseUrl + '/neighborhoods/simple');
	}

	getAllTypesOfRatingReportsByNgId(id: number){
		return httpClient.get<INeghborhoodReportByAllTypesOfRatingDto>(apiBaseUrl + `/neighborhoods/${id}/reports/rating`);
	}

	getPriceReportsByNgId(id: number){
		return httpClient.get<INeighborhoodPriceReport>(apiBaseUrl + `/neighborhoods/${id}/reports/price`);
	}

	getAvailabilityReportsByNgId(id: number){
		return httpClient.get<INeighborhoodAvailabilityReport>(apiBaseUrl + `/neighborhoods/${id}/reports/availability`);
	}
}

const neighborhoodsApiClient = new neighborhoodsApi();
export default neighborhoodsApiClient;
