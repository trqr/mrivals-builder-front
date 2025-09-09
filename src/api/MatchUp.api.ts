import {api} from "./axios.config";

export const addMatchUp = async (
    heroId: number,
    counterPickId: number,
    value: number
) => {
    return await api.post("/match-ups", {heroId: heroId, allyId: counterPickId, value: value})
        .then(res => res.data)
        .catch(err => console.log(err));
}

export const updateMatchUp = async (
    matchUpId: number,
    heroId: number,
    counterPickId: number,
    value: number
) => {
    return await api.put(`/match-ups/${matchUpId}`, {heroId: heroId, allyId: counterPickId, value: value})
        .then(res => res.data)
        .catch(err => console.log(err));
}

export const deleteMatchUp = async (heroId: number) => {
    return await api.delete(`/match-up/${heroId}`)
        .then(res => res.data)
        .catch(err => console.log(err));
}