import { api } from "./config/Axios.config.ts"
import type {LoginDTO} from "../componnents/common/dialogs/LoginDialog.tsx";
import {toast} from "react-toastify";
import type {RegisterDTO} from "../componnents/common/dialogs/RegisterDialog.tsx";

export const login = async (logs: LoginDTO) => {
    return await api.post('/auth/login', logs)
        .then((res) => {
            toast.success(`Welcome ${res.data.user.username}!`);
            return res.data
        })
        .catch((err) => {
            return err
        })
}

export const register = async (registerDTO: RegisterDTO) => {
    return await api.post('/auth/register', registerDTO)
        .then((res) => {
            toast.success(`Account succesfully created !`);
            return res.data
        })
        .catch((err) => {
            return err
        })
}

export const isTokenValid = async () => {
    const token = localStorage.getItem("MBtoken");
    if (!token) return;

    const res = await api.get("/auth");
    return res.data;
}