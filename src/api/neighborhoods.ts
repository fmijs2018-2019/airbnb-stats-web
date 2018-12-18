import axios, { AxiosRequestConfig } from 'axios';
import { INeighborhood, INeighborhoodDetailed } from 'src/models/neighborhoods/neighborhood';

export const getNeighborhoods = () => {
    return axios.get<INeighborhood[]>('http://localhost:8080/neighborhoods/list')
        .then((response) => response.data);
}
export const getGeoJson = (id: number | null = null) => {
    const config: AxiosRequestConfig = { params: { id } };
    return axios.get<INeighborhoodDetailed>('http://localhost:8080/neighborhoods', config)
        .then((response) => response.data);
}