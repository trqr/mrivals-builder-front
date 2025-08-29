import axios from "axios";

export const imageBaseUrl = "https://marvelrivalsapi.com"
export const iconBaseUrl = "https://marvelrivalsapi.com/rivals"
export const baseUrl = "https://marvelrivalsapi.com/api/v1"

export const Api = axios.create({
    baseURL: "http://localhost:8080"
});

Api.interceptors.request.use((config) => {
    const token = localStorage.getItem("MBtoken");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
