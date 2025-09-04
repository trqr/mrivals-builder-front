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

export const changeUsersRoleToAdmin = async (ids: number[]) => {
    return await Api.put(`/users/role/admin`, ids)
        .then((res) => res.data)
        .catch(console.error);
}

export const changeUsersRoleToUser = async (ids: number[]) => {
    return await Api.put(`/users/role/user`, ids)
        .then((res) => res.data)
        .catch(console.error);
}