import axios from "axios";

export const imageBaseUrl = "https://marvelrivalsapi.com"
export const baseUrl = "https://marvelrivalsapi.com/api/v1"

export const Api = axios.create({
    baseURL: "http://localhost:8080"
});
