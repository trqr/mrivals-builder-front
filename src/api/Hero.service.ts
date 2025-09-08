import {api} from "./axios.config.ts";

export const getAllHeroes = async () => {
    return await api.get("/heroes")
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
    return await api.get(`/heroes/${id}`)
    .then((res) => {
        return res.data;
    })
        .catch((err) => {
            return err;
        })
}

export const updateHeroesMainRole = async (ids: number[], mainRole: string) => {
    return await api.put(`/heroes/main-role`, {ids: ids, role: mainRole})
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            return err;
        })
}