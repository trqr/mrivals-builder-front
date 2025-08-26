import { Api } from "./axios.config"
import type {LoginDTO} from "../componnents/common/dialogs/LoginDialog.tsx";

export const login = async (logs: LoginDTO) => {
    return await Api.post('/auth/login', logs)
        .then((res) => {
            console.log(res.data)
            return res.data
        })
        .catch((err) => {
            console.log(err.response.data)
            return err.response.data
        })
}