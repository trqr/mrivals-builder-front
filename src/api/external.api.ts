import {externalApi} from "./config/Axios.config.ts";

export const getBestPlayersByHero = async (heroName: string) => {
    return await externalApi.get(`/heroes/leaderboard/${heroName}`)
        .then((response) => {
            console.log(response.data.players);
            return response.data.players;
        })
        .catch((error) => {
            console.log(error);
            return error;
        })
}