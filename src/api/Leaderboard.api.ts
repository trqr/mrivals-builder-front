import {api} from "./axios.config.ts";

export const getHeroLeaderboard = async (heroId: string, page: number, size: number) => {
    return await api.get(`/leaderboard/${heroId}`, {params: {page, size}})
        .then(response => {
            console.log(response.data);
            return response.data;
        })
        .catch(error => {
            console.log(error);
            throw error;
        })

}