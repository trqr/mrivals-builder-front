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

export const updateHeroesMainRole = async (ids: number[], mainRole: string) => {
    return await Api.put(`/heroes/main-role`, {ids: ids, role: mainRole})
        .then((res) => {
            console.log(res.data);
            return res.data;
        })
        .catch((err) => {
            console.log(err);
            return err;
        })
}