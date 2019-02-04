import axios, { AxiosRequestConfig } from 'axios';
import auth0Client from 'src/Auth';
import store from '../redux/store';
import { isAuthenticated } from 'src/redux/actions/authActions';

class HttpClient {
    
    get<T>(url: string, config?: AxiosRequestConfig) {
        let axiosConfig: AxiosRequestConfig = {};
        const state = store.getState();
        const idToken = state.auth.idToken;
        
        if(config) {
            axiosConfig = {... config}
        }

        if (isAuthenticated(state)) {
            axiosConfig.headers = { Authorization: `Bearer ${idToken}` }
        }
        
        return axios.get<T>(url, axiosConfig)
            .then((response) => response.data);
    }
}

const httpClient = new HttpClient;
export default httpClient;
