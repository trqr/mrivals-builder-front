import { api } from "./axios.config";

export const addSynergy = async (
    heroId: number,
    allyId: number,
    value: number,
    isTeamup: boolean
) => {
    return await api.post("/synergies", {heroId: heroId, allyId: allyId, value: value, isTeamup: isTeamup})
        .then(res => res.data)
        .catch(err => console.log(err));
}

export const updateSynergy = async (
    synergieId: number,
    heroId: number,
    allyId: number,
    value: number,
    isTeamup: boolean
    ) => {
    return await api.put(`/synergies/${synergieId}`, {heroId: heroId, allyId: allyId, value: value, isTeamup: isTeamup})
        .then(res => res.data)
        .catch(err => console.log(err));
}

export const deleteSynergy = async (heroId: number) => {
    return await api.delete(`/synergies/${heroId}`)
        .then(res => res.data)
        .catch(err => console.log(err));
}