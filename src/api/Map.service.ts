import {Api} from "./axios.config.ts";

export const getAllMap = async () => {
    return await Api.get("/maps")
        .then((res ) => {
            {console.log(res.data)};
            return res.data;
        }

)
        .catch((err) => {
        console.log(err);
        return err;
    })
}

export const getMapById = async (id: string) => {
    return await Api.get(`/maps/${id}`)
    .then((res ) => {
        {console.log(res.data)};
        return res.data;
    })

    .catch((err) => {
        console.log(err);
        return err;
    })
}