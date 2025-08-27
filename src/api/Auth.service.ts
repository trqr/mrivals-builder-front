import { Api } from "./axios.config"
import type {LoginDTO} from "../componnents/common/dialogs/LoginDialog.tsx";
import {toast} from "react-toastify";
import type {RegisterDTO} from "../componnents/common/dialogs/RegisterDialog.tsx";

export const login = async (logs: LoginDTO) => {
    return await Api.post('/auth/login', logs)
        .then((res) => {
            console.log(res.data)
            toast.success(`Welcome ${res.data.user.username}!`);
            return res.data
        })
        .catch((err) => {
            console.log(err.response.data)
            return err.response.data
        })
}

export const register = async (registerDTO: RegisterDTO) => {
    return await Api.post('/auth/register', registerDTO)
        .then((res) => {
            console.log(res.data)
            toast.success(`Account succesfully created !`);
            return res.data
        })
        .catch((err) => {
            console.log(err.response.data)
            return err.response.data
        })
}