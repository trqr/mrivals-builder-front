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