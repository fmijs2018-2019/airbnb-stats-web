import axios, { AxiosRequestConfig } from 'axios';
import { INeighborhood, IReportsData } from 'src/models/neighborhoods/neighborhood';

export const getNeighborhoods = () => {
    return axios.get<INeighborhood[]>('http://localhost:8080/neighborhoods')
        .then((response) => response.data);
}

export const getReports = (id: number | null = null) => {
    if (id) {
        return axios.get<IReportsData>(`http://localhost:8080/neighborhoods/${id}/reports`)
            .then((response) => response.data);
    } else {
        return axios.get<IReportsData>(`http://localhost:8080/neighborhoods/reports`)
            .then((response) => {
                console.log(response);
                return response.data;
            });
    }
}
