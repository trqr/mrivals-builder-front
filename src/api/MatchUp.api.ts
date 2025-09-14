import {api} from "./config/Axios.config.ts";

export const addMatchUp = async (
    heroId: number,
    counterPickId: number,
    value: number
) => {
    const res = await api.post("/match-up", {
        heroId,
        counterPickId,
        value,
    });
    return res.data;
};

export const updateMatchUp = async (
    matchUpId: number,
    heroId: number,
    counterPickId: number,
    value: number
) => {
    const res = await api.put(`/match-up/${matchUpId}`, {
        heroId,
        counterPickId,
        value,
    });
    return res.data;
};

export const deleteMatchUp = async (heroId: number) => {
    const res = await api.delete(`/match-up/${heroId}`);
    return res.data;
};