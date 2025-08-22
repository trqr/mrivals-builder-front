import {tristanBackApi} from "./axios.config.ts";

export const getAllHeroes = async () => {
    return await tristanBackApi.get("/heroes/all").then((res) => {
        console.log(res.data);
        return res.data;
    })
}