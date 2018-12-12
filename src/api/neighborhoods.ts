import axios from 'axios';
import { INeighborhood } from 'src/models/neighborhoods/neighborhood';

export const getNeighborhoods = () => {
    return axios.get<INeighborhood[]>('http://localhost:8080/neighborhoods')
        .then((response) => response.data);
}