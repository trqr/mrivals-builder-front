import {api} from "./config/Axios.config.ts"


export const getBestWinRateByRole = async (heroesIds: (number | undefined)[]) => {
    return await api.post("/compo/bestWinRateByRole", heroesIds)
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            return err;
        })
}

export const getTeamCounter = async (heroesIds: (number | undefined)[]) => {
    return await api.post("/compo/teamCounter", heroesIds)
    .then((res) => {
        return res.data;
    })
    .catch((err) => {
        return err;
    })
}

export const getTeamSynergie = async (heroesIds: (number | undefined)[]) => {
    return await api.post("/compo/teamSynergies", heroesIds)
    .then((res) => {
        return res.data;
    })
    .catch((err) => {
        return err;
    })
}

export const saveCompo = async (heroesIds: (number | undefined)[]) => {
    return await api.post("/compo/save", heroesIds)
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            return err;
        })
}

export const getUserTeamCompos = async () => {
    return await api.get("/compo")
        .then((res) => res.data)
        .catch((err) => {
            console.error("Erreur getUserTeamCompos :", err);
            return [];
        });
}

export const deleteTeam = async (teamId: (number | undefined)[]) => {
    return await api.delete(`/compo/${teamId}`)
    .then((res) => res.status)
    .catch((err) => {console.log(err)})
}

export const deleteAllTeams = async () => {
    return await api.delete(`/compo/all`)
    .then((res) => res.status)
    .catch((err) => {console.log(err)})
}
