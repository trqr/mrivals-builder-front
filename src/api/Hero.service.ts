import {Api} from "./axios.config.ts";

export const getAllHeroes = async () => {
    return await Api.get("/heroes")
        .then((res) => {
        console.log(res.data);
        return res.data;
    })
        .catch((err) => {
            console.log(err);
            return err;
        })
}

export const getHeroes = async (id: string) => {
    return await Api.get(`/heroes/${id}`)
    .then((res) => {
        console.log(res.data);
        return res.data;
    })
        .catch((err) => {
            console.log(err);
            return err;
        })
}