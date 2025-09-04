import { Api } from "./axios.config"

export const getAllUsers = async () => {
    return await Api.get("/users")
        .then((res) => {
            console.log(res.data);
            return res.data;
        })
        .catch((err) => {
            console.log(err);
            return err;
        })
}