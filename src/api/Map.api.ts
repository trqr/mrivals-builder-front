import {api} from "./axios.config.ts";

export const getAllMap = async () => {
    return await api.get("/maps")
        .then((res ) => {
            return res.data;
        }

)
        .catch((err) => {
        return err;
    })
}

export const getMapById = async (id: string) => {
    return await api.get(`/maps/${id}`)
    .then((res ) => {
        return res.data;
    })

    .catch((err) => {
        return err;
    })
}

export const updateMaps = async () => {
    return await api.get("/maps/update")
        .then((res ) => {
            return res.data;
        })
        .catch((err) => {
            throw err;
        })
}