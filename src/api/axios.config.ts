import axios from "axios";

export const imageBaseUrl = "https://marvelrivalsapi.com"
export const iconBaseUrl = "https://marvelrivalsapi.com/rivals"
export const baseUrl = "https://marvelrivalsapi.com/api/v1"

export const api = axios.create({
    baseURL: "http://localhost:8080"
});

export const externalApi = axios.create({
    baseURL: "https://marvelrivalsapi.com/api/v1",
    headers: {'x-api-key': '27cd40ea0d84847bc2bba2f32bccabd0cbc2656b47407ca21b5443603bcf2673'}
});


api.interceptors.request.use((config) => {
    const token = localStorage.getItem("MBtoken");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
