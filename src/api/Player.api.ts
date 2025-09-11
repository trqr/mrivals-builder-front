import { externalApi } from "./axios.config.ts";


export const getPlayerStats = async (playerAccount: string) => {
    return await externalApi.get(`/player/${playerAccount}`)
        .then((res) => {
            console.log(res.data);
            return res.data;
        })
        .catch((err) => {
            console.error(err);
            return err;
        });
};

export const updatePlayerStats = async (playerAccount: string) => {
    return await externalApi.get(`/player/${playerAccount}/update`)
        .then((res) => {
            return res.data
        })
        .catch((err) => {
            return err.response.data})
}
