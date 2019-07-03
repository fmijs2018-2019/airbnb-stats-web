import httpClient from './httpClient';
import { INeighborhoodDetailed, IReportsData, INeighborhoodReport, INeighborhood } from '../models/neighborhoods/neighborhood';

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
	
	getNeighborhoodsSimple(){
		return httpClient.get<INeighborhood[]>('htttp://localhost:8080/neighborhoods/simple')
	}
}

const neighborhoodsApiClient = new neighborhoodsApi();
export default neighborhoodsApiClient;
