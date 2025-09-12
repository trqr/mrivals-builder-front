import {api} from "./config/Axios.config.ts";


export const savePlayerStats = async () => {
    return await api.post(`/player-stats/save`)
        .then((res) => {
            console.log(JSON.parse(res.data.statsRawJson));
            return JSON.parse(res.data.statsRawJson);
        })
        .catch((err) => {
            console.error(err);
            return err;
        });
};

export const getPlayerStats = async () => {
    return await api.get(`/player-stats`)
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
    return await api.post(`/player-stats/update`)
        .then((res) => {
            console.log(JSON.parse(res.data));
            return JSON.parse(res.data);
        })
        .catch((err) => {
            return err.response.data})
}
