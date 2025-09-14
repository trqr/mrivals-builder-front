import {api} from "./config/Axios.config.ts";

export const getAllMap = async () => {
    const res = await api.get("/maps");
    return res.data;
};

export const getMapById = async (id: string) => {
    const res = await api.get(`/maps/${id}`);
    return res.data;
};

export const updateMaps = async () => {
    const res = await api.get("/maps/update");
    return res.data;
};
