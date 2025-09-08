import { externalApi } from "./axios.config.ts";

/**
 * Récupère les stats d’un joueur via son identifiant ou pseudo
 * @param query identifiant ou nom du joueur
 */
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
