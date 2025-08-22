import axios from "axios";

export const imageBaseUrl = "https://marvelrivalsapi.com"
export const baseUrl = "https://marvelrivalsapi.com/api/v1"

export const tristanBackApi = axios.create({
    baseURL: "http://192.168.0.125:8080"
});