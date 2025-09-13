import {api} from "./config/Axios.config.ts";

export const addMatchUp = async (
    heroId: number,
    counterPickId: number,
    value: number
) => {
    return await api.post("/match-up", {heroId: heroId, counterPickId: counterPickId, value: value})
        .then(res => res.data)
        .catch(err => console.log(err));
}

export const updateMatchUp = async (
    matchUpId: number,
    heroId: number,
    counterPickId: number,
    value: number
) => {
    return await api.put(`/match-up/${matchUpId}`, {heroId: heroId, counterPickId: counterPickId, value: value})
        .then(res => res.data)
        .catch(err => console.log(err));
}

export const deleteMatchUp = async (heroId: number) => {
    return await api.delete(`/match-up/${heroId}`)
        .then(res => res.data)
        .catch(err => console.log(err));
}