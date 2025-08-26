import Box from "@mui/material/Box";
import {Avatar, Button} from "@mui/material";
import {useState} from "react";
import ProfileMenu from "./ProfileMenu.tsx";
import LoginDialog from "./dialogs/LoginDialog.tsx";
import RegisterDialog from "./dialogs/RegisterDialog.tsx";

const AuthContainer = () => {
    const [logged, setLogged] = useState<boolean>(false)
    const [openMenu, setOpenMenu] = useState(false);
    const [openLoginDialog, setOpenLoginDialog] = useState<boolean>(false);
    const [openRegisterDialog, setOpenRegisterDialog] = useState<boolean>(false);

    const handleLogout = () => {
        setOpenMenu(false);
        setLogged(false);
    }

    const handleLogin = () => {
        setOpenLoginDialog(false);
        setLogged(true);
    }

    return (
        <>
            {!logged ?
                <Box>
                    <Button variant={"contained"} onClick={() => setOpenLoginDialog(true)}>Login</Button>
                    <Button variant={"outlined"} onClick={() => setOpenRegisterDialog(true)}>Register</Button>
                </Box>
                :
                <>
                    <Box sx={{position: "relative", cursor: "pointer", margin: "20px"}}>
                        <Avatar
                                onClick={() => setOpenMenu(!openMenu)}
                        >
                        </Avatar>
                        {openMenu &&
                            <Box
                                position="absolute"
                                left={-80}
                                top={"100%"}
                                mt={1}
                                width={180}
                                zIndex={10}
                            >
                                <ProfileMenu handleLogout={handleLogout}></ProfileMenu>
                            </Box>
                        }
                    </Box>
                </>
            }
            <LoginDialog open={openLoginDialog} setOpen={setOpenLoginDialog} handleLogin={handleLogin}></LoginDialog>
            <RegisterDialog open={openRegisterDialog} setOpen={setOpenRegisterDialog}></RegisterDialog>
        </>
    )
}

export default AuthContainer;