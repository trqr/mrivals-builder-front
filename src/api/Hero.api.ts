import {api} from "./config/Axios.config.ts";

export const getAllHeroes = async () => {
    const res = await api.get("/heroes");
    return res.data;
};

export const getHero = async (id: string) => {
    const res = await api.get(`/heroes/${id}`);
    return res.data;
};

export const updateHeroesMainRole = async (ids: number[], mainRole: string) => {
    const res = await api.put(`/heroes/main-role`, {ids, role: mainRole});
    return res.data;
};

export const updateHeroes = async () => {
    const res = await api.get(`/heroes/update`);
    return res.data;
};