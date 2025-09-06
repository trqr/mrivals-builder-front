import {Api} from "./axios.config.ts";

export const getAllMap = async () => {
    return await Api.get("/maps")
        .then((res ) => {
            return res.data;
        }

)
        .catch((err) => {
        return err;
    })
}

export const getMapById = async (id: string) => {
    return await Api.get(`/maps/${id}`)
    .then((res ) => {
        return res.data;
    })

    .catch((err) => {
        return err;
    })
}