import {Api} from "./axios.config"


export const getBestWinRateByRole = async (heroesIds: (number | undefined)[]) => {
    return await Api.post("/compo/bestWinRateByRole", heroesIds)
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            return err;
        })
}

export const getTeamCounter = async (heroesIds: (number | undefined)[]) => {
    return await Api.post("/compo/teamCounter", heroesIds)
    .then((res) => {
        return res.data;
    })
    .catch((err) => {
        return err;
    })
}

export const getTeamSynergie = async (heroesIds: (number | undefined)[]) => {
    return await Api.post("/compo/teamSynergies", heroesIds)
    .then((res) => {
        return res.data;
    })
    .catch((err) => {
        return err;
    })
}

export const saveCompo = async (heroesIds: (number | undefined)[]) => {
    return await Api.post("/compo/save", heroesIds)
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            return err;
        })
}