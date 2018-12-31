import axios, { AxiosRequestConfig } from 'axios';
import { INeighborhood, IReportsData } from 'src/models/neighborhoods/neighborhood';

export const getNeighborhoods = () => {
    return axios.get<_.Dictionary<INeighborhood>>('http://localhost:8080/neighborhoods')
        .then((response) => response.data);
}

export const getReports = (id: number) => {
    return axios.get<IReportsData>(`http://localhost:8080/neighborhoods/${id}/reports`)
        .then((response) => response.data);
}
