import axios, { AxiosRequestConfig } from 'axios';
import auth0Client from 'src/Auth';

class HttpClient {
    get<T>(url: string, config?: AxiosRequestConfig) {
        let axiosConfig: AxiosRequestConfig = {};
        
        if(config) {
            axiosConfig = {... config}
        }

        if (auth0Client.isAuthenticated()) {
            axiosConfig.headers = { Authorization: `Bearer ${auth0Client.getIdToken()}` }
        }
        
        return axios.get<T>(url, axiosConfig)
            .then((response) => response.data);
    }
}

const httpClient = new HttpClient;
export default httpClient;
