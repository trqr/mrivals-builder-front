import axios from "axios";

export const imageBaseUrl = "https://marvelrivalsapi.com"
export const baseUrl = "https://marvelrivalsapi.com/api/v1"

export const marvelsApi = axios.create({
    baseURL: "https://marvelrivalsapi.com/api/v1",
    headers: {
        "Content-Type": "application/json",
        "x-api-key": "27cd40ea0d84847bc2bba2f32bccabd0cbc2656b47407ca21b5443603bcf2673"
    }
});