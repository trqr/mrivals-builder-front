import { api } from "./config/Axios.config.ts";

export const addSynergy = async (
    heroId: number,
    allyId: number,
    value: number,
    isTeamup: boolean
) => {
    const res = await api.post("/synergies", {heroId: heroId, allyId: allyId, value: value, isTeamup: isTeamup})
    return res.data;
}

export const updateSynergy = async (
    synergieId: number,
    heroId: number,
    allyId: number,
    value: number,
    isTeamup: boolean
    ) => {
    const res =  await api.put(`/synergies/${synergieId}`, {heroId: heroId, allyId: allyId, value: value, isTeamup: isTeamup})
    return res.data;
}

export const deleteSynergy = async (heroId: number) => {
    const res = await api.delete(`/synergies/${heroId}`)
    return res.data;
}