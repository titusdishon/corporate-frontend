import axios from 'axios';
import {CATCH_JWT, SERVER_API_URL} from "./Constants";

const TIMEOUT = 1 * 60 * 1000;
axios.defaults.timeout = TIMEOUT;
axios.defaults.baseURL = SERVER_API_URL;

const setupAxiosInterceptors = onUnauthenticated => {
    const onRequestSuccess = config => {
        const token = localStorage.getItem(CATCH_JWT);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
            config.headers.ContentType = `'content-type': 'multipart/form-data'`
        }
        return config;
    };
    const onResponseSuccess = response => response;
    const onResponseError = err => {
        const status = err.status || (err.response ? err.response.status : 0);
        const data = err.data || (err.response ? err.response.data : 0);
        if (status === 406 ||status === 428 || status === 404 || status === 400||status === 403 || status === 412) {
            return {
                status: status,
                message: data.message,
                token: data.token || null,
                name: data.driverName||null,
                email: data.email||null,
                avatar:data.imageurl||null,
                files:data.files||null,
            }
        }
        return Promise.reject(err);
    };
    axios.interceptors.request.use(onRequestSuccess);
    axios.interceptors.response.use(onResponseSuccess, onResponseError);
};

export default setupAxiosInterceptors;
