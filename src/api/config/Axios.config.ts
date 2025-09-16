import axios from "axios";

export const imageBaseUrl = "https://marvelrivalsapi.com"
export const iconBaseUrl = "https://marvelrivalsapi.com/rivals"
export const BASE_URL = "https://marvelrivalsapi.com/api/v1"

export const api = axios.create({
    baseURL: "http://localhost:8080"
});


api.interceptors.request.use((config) => {
    const token = localStorage.getItem("MBtoken");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (res) => res,
    (error) => Promise.reject(error.response?.data || error)
);
