import httpClient from './httpClient';
import { INeighborhoodDetailed, IReportsData, INeighborhoodReport, INeighborhood } from '../models/neighborhoods/neighborhood';
import INeghborhoodReportByAllTypesOfRatingDto from '../dtos/INeighborhoodReportByAllTypesOfRatingDto';
import INeighborhoodPriceReport from '../dtos/INeighborhoodPriceReport';
import INeighborhoodAvailabilityReport from '../dtos/INeighborhoodAvailabilityReport';

class neighborhoodsApi {
    getNeighborhoodsDetailed() {
        return httpClient.get<INeighborhoodDetailed[]>('http://localhost:8080/neighborhoods');
    }

    getReports(id: number) {
        return httpClient.get<IReportsData>(`http://localhost:8080/neighborhoods/${id}/reports`);
    }

    getAllReports() {
        return httpClient.get<INeighborhoodReport[]>('http://localhost:8080/neighborhoods/reports');
	}
	
	getAllNeighborhoodsSimple(){
		return httpClient.get<INeighborhood[]>('http://localhost:8080/neighborhoods/simple');
	}

	getAllTypesOfRatingReportsByNgId(id: number){
		return httpClient.get<INeghborhoodReportByAllTypesOfRatingDto>(`http://localhost:8080/neighborhoods/${id}/reports/rating`);
	}

	getPriceReportsByNgId(id: number){
		return httpClient.get<INeighborhoodPriceReport>(`http://localhost:8080/neighborhoods/${id}/reports/price`);
	}

	getAvailabilityReportsByNgId(id: number){
		return httpClient.get<INeighborhoodAvailabilityReport>(`http://localhost:8080/neighborhoods/${id}/reports/availability`);
	}
}

const neighborhoodsApiClient = new neighborhoodsApi();
export default neighborhoodsApiClient;
