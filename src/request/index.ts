import axios, { AxiosError, type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from "axios";

const instance = axios.create({
    baseURL: 'http://127.0.0.1:8000',
    timeout: 2000,
});

export default instance;
