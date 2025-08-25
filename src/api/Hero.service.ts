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