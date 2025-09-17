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

export const updatePlayerStats = async () => {
    return await api.post(`/mr-accounts/update`)
        .then((res) => {
            console.log(JSON.parse(res.data));
            return JSON.parse(res.data);
        })
        .catch((error) => {
            const match = error.response.data.match(/{.*}/);
            if (match) {
                const parsed = JSON.parse(match[0]);
                return parsed
            }
        return (error || "Erreur inconnue");
        })
}

export const deleteAccount = async (accountId: number) => {
    return await api.delete(`/mr-accounts/${accountId}`)
}


