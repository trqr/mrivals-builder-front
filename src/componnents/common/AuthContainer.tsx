import Box from "@mui/material/Box";
import {Button} from "@mui/material";
import {useState} from "react";
import ProfileMenu from "./ProfileMenu.tsx";
import LoginDialog from "./dialogs/LoginDialog.tsx";
import RegisterDialog from "./dialogs/RegisterDialog.tsx";
import {useAuth} from "../../hooks/useAuth.tsx";

const AuthContainer = () => {
    // @ts-expect-error bien ds le context
    const { isAuthenticated } = useAuth();
    const [openLoginDialog, setOpenLoginDialog] = useState<boolean>(false);
    const [openRegisterDialog, setOpenRegisterDialog] = useState<boolean>(false);

    return (
        <>
            {!isAuthenticated ?
                <Box>
                    <Button variant={"contained"} onClick={() => setOpenLoginDialog(true)}>Login</Button>
                    <Button variant={"outlined"} onClick={() => setOpenRegisterDialog(true)}><span>Register</span></Button>
                </Box>
                :
                <ProfileMenu/>
            }
            <LoginDialog open={openLoginDialog} setOpen={setOpenLoginDialog}></LoginDialog>
            <RegisterDialog open={openRegisterDialog} setOpen={setOpenRegisterDialog}></RegisterDialog>
        </>
    )
}

export default AuthContainer;