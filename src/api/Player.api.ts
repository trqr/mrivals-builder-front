import {api} from "./config/Axios.config.ts";


export const savePlayerStats = async (account: string) => {
    return await api.post(`/mr-accounts/add/${account}`)
        .then((res) => {
            console.log(res.data);
            return res.data;
        })
        .catch();
};

export const getAllPlayersStats = async () => {
    return await api.get(`/mr-accounts`)
        .then((res) => {
            console.log(res.data);
            return res.data;
        })
        .catch((err) => {
            return err;
        });
};

export const getPlayerStats = async (accountId: string) => {
    return await api.get(`/mr-accounts/${accountId}`)
        .then((res) => {
            console.log(JSON.parse(res.data.statsRawJson));
            return JSON.parse(res.data.statsRawJson);
        })
        .catch((err) => {
            console.error(err);
            return err;
        });
};

export const updatePlayerStats = async (accountId: number) => {
    return await api.post(`/mr-accounts/update/${accountId}`)
        .then((res) => {
            console.log(res.data);
            return res.data;
        })
        .catch((error) => {
            console.log(error);
        return (error || "Erreur inconnue");
        })
}

export const deleteAccount = async (accountId: number) => {
    return await api.delete(`/mr-accounts/${accountId}`)
}


