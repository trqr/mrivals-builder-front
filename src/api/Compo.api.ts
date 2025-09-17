    import {api} from "./config/Axios.config.ts"

    export const getBestWinRateByRole = async (heroesIds: (number | undefined)[]) => {
        const res = await api.post("/compo/bestWinRateByRole", heroesIds);
        return res.data;
    };

    export const getTeamCounter = async (heroesIds: (number | undefined)[]) => {
        const res = await api.post("/compo/teamCounter", heroesIds);
        return res.data;
    };

    export const getTeamSynergie = async (heroesIds: (number | undefined)[]) => {
        const res = await api.post("/compo/teamSynergies", heroesIds);
        return res.data;
    };

    export const saveCompo = async (heroesIds: (number | undefined)[]) => {
        const res = await api.post("/compo/save", heroesIds);
        return res.data;
    };

    export const getUserTeamCompos = async () => {
        const res = await api.get("/compo");
        return res.data;
    };

    export const deleteTeam = async (teamId: number | undefined) => {
        const res = await api.delete(`/compo/${teamId}`);
        return res.status;
    };

    export const deleteAllTeams = async () => {
        const res = await api.delete(`/compo/all`);
        return res.status;
    };

    export const getTeamById = async (teamId: string | undefined) => {
        const res = await api.get(`/compo/${teamId}`);
        return res.data;
    }
