import { Api } from "./axios.config";

export const addSynergy = async (
    heroId: number,
    allyId: number,
    value: number,
    isTeamup: boolean
) => {
    return await Api.post("/synergies", {heroId: heroId, allyId: allyId, value: value, isTeamup: isTeamup})
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
    return await Api.put(`/synergies/${synergieId}`, {heroId: heroId, allyId: allyId, value: value, isTeamup: isTeamup})
        .then(res => res.data)
        .catch(err => console.log(err));
}