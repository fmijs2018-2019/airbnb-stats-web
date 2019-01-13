import axios from 'axios';
import { INeighborhoodDetailed, IReportsData, INeighborhoodReport } from 'src/models/neighborhoods/neighborhood';

export const getNeighborhoodsDetailed = () => {
    return axios.get<INeighborhoodDetailed[]>('http://localhost:8080/neighborhoods')
        .then((response) => response.data);
}

export const getReports = (id: number) => {
    return axios.get<IReportsData>(`http://localhost:8080/neighborhoods/${id}/reports`)
        .then((response) => response.data);
}

export const getAllReports = () => {
    return axios.get<INeighborhoodReport[]>('http://localhost:8080/neighborhoods/reports')
        .then((response) => response.data);
}
