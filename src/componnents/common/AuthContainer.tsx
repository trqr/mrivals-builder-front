import Box from "@mui/material/Box";
import {Avatar, Button} from "@mui/material";
import {useState} from "react";
import ProfileMenu from "./ProfileMenu.tsx";
import LoginDialog from "./dialogs/LoginDialog.tsx";
import RegisterDialog from "./dialogs/RegisterDialog.tsx";
import {useAuth} from "../../hooks/useAuth.tsx";

const AuthContainer = () => {
    // @ts-expect-error bien ds le context
    const { isAuthenticated, setUser } = useAuth();
    const [openMenu, setOpenMenu] = useState(false);
    const [openLoginDialog, setOpenLoginDialog] = useState<boolean>(false);
    const [openRegisterDialog, setOpenRegisterDialog] = useState<boolean>(false);

    const handleLogout = () => {
        setOpenMenu(false);
        setUser(null);
        localStorage.removeItem("MBtoken");
    }


    return (
        <>
            {!isAuthenticated ?
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
            <LoginDialog open={openLoginDialog} setOpen={setOpenLoginDialog}></LoginDialog>
            <RegisterDialog open={openRegisterDialog} setOpen={setOpenRegisterDialog}></RegisterDialog>
        </>
    )
}

export default AuthContainer;