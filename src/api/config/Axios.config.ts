import axios from "axios";
import {toast} from "react-toastify";

export const imageBaseUrl = "https://marvelrivalsapi.com"
export const iconBaseUrl = "https://marvelrivalsapi.com/rivals"
export const BASE_URL = "https://marvelrivalsapi.com/api/v1"

export const api = axios.create({
    baseURL: "http://localhost:8080"
});    // globaliser les try catchs ds la config


api.interceptors.request.use((config) => {
    const token = localStorage.getItem("MBtoken");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    toast.error(error.response.data.message);
                    break;
                case 403:
                    toast.error(error.response.data.message);
                    break;
                case 500:
                    toast.error(error.response.data.message);
                    break;
                default:
                    toast.error(`⚠️ error ${error.response.status}: ${error.response.data.message}`);
            }
        } else if (error.request) {
            toast.error("No server response");
        } else {
            toast.error(`Axios error:  ${error.response.data}`);
        }

        return Promise.reject(error);
    }
);
