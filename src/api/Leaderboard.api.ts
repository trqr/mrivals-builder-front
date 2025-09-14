import {api} from "./config/Axios.config.ts";

export const getHeroLeaderboard = async (heroId: string, page: number, size: number) => {
    const res = await api.get(`/leaderboard/${heroId}`, {params: {page, size}});
    return res.data;
};

export const updateLeaderboard = async () => {
    const res = await api.get("/leaderboard/update");
    return res.data;
};