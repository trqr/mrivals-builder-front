import { api } from "./config/Axios.config.ts"
import {toast} from "react-toastify";

export const getAllUsers = async () => {
    return await api.get("/users")
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            return err;
        })
}

export const changeUsersRoleToAdmin = async (ids: number[]) => {
    return await api.put(`/users/role/admin`, ids)
        .then((res) => res.data)
        .catch(console.error);
}

export const changeUsersRoleToUser = async (ids: number[]) => {
    return await api.put(`/users/role/user`, ids)
        .then((res) => res.data)
        .catch(console.error);
}

export const changeUsername = async (userName: string) => {
    return await api.patch(`/users/username?userName=${userName}`)
        .then((res) => {
            toast.success(`Username changed to ${userName} successfully.`);
            return res.data
        })
        .catch(error => {
            toast.error(`An error occurred: ${error}`);
            return error;
        });
}

export const changeUserMRaccount = async (userId: number, accountName: string) => {
    return await api.patch(`/users/${userId}/mr-account?accountName=${accountName}`)
        .then((res) => {
            toast.success(`Marvel Rivals account changed to ${accountName} successfully.`);
            return res.data
        })
        .catch(error => {
            toast.error(`An error occurred: ${error}`);
            return error;
        });
}

export const changeUserPassword = async (oldPassword: string, newPassword: string) => {
    return await api.patch(`/users/password`, {oldPassword: oldPassword, newPassword: newPassword})
        .then((res) => {
            return res.data
        })
        .catch(error => {
            return error.response.data;
        });
}

export const banUsers = async (ids: number[]) => {
    const res = await api.put(`/users/ban`, ids);
    return res.data;
}