import { externalApi } from "./axios.config.ts";


export const getPlayerStats = async (query: string) => {
    return await externalApi.get(`/player/${query}`)
        .then((res) => {
            console.log(res.data);
            return res.data;
        })
        .catch((err) => {
            console.error(err);
            return err;
        });
};
