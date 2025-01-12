import axios, { InternalAxiosRequestConfig } from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:3000/api/v1/',
    timeout: 2000,
    headers: {
        "Content-Type": "application/json"
    }
})

const authenticatedInstance = axios.create({
    baseURL: 'http://localhost:3000/api/v1/',
    timeout: 2000,
    headers: {
        "Content-Type": "application/json"
    }
})

authenticatedInstance.interceptors.request.use((config): InternalAxiosRequestConfig<any> => {
    const token = localStorage.getItem('token');
    config.headers.Authorization = token ? `Bearer ${JSON.parse(token)}` : "";
    return config;
})

authenticatedInstance.interceptors.response.use(response => response, err => {
    if (err.response.status == 401) {
        console.log('Token invalid')
        localStorage.removeItem('token')
    }
})

export default instance;
export { authenticatedInstance }
