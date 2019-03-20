import httpClient from './httpClient';
import { INeighborhoodDetailed, IReportsData, INeighborhoodReport } from '../models/neighborhoods/neighborhood';

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
}

const neighborhoodsApiClient = new neighborhoodsApi();
export default neighborhoodsApiClient;
