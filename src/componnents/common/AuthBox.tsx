import { Button, Stack, Box } from "@mui/material";
import { useState } from "react";
import ProfileMenu from "./ProfileMenu.tsx";
import LoginDialog from "./dialogs/LoginDialog.tsx";
import RegisterDialog from "./dialogs/RegisterDialog.tsx";
import { useAuth } from "../../hooks/useAuth.tsx";

const AuthBox = () => {
    const { isAuthenticated } = useAuth();
    const [openLoginDialog, setOpenLoginDialog] = useState<boolean>(false);
    const [openRegisterDialog, setOpenRegisterDialog] = useState<boolean>(false);

    return (
        <>
            {!isAuthenticated ?
                <Stack direction={"row"} spacing={1}>
                    <Button variant={"contained"} onClick={() => setOpenLoginDialog(true)}>Login</Button>
                    <Box sx={{ display: { xs: "none", md: "block" } }}>
                        <Button variant={"outlined"} onClick={() => setOpenRegisterDialog(true)}><span>Register</span></Button>
                    </Box>
                </Stack>
                :
                <ProfileMenu />
            }
            <LoginDialog open={openLoginDialog}
                setOpen={setOpenLoginDialog}
                onRegisterRequest={() => {
                    setOpenLoginDialog(false);
                    setOpenRegisterDialog(true);
                }}
            ></LoginDialog>
            <RegisterDialog open={openRegisterDialog} setOpen={setOpenRegisterDialog}></RegisterDialog>
        </>
    )
}

export default AuthBox;