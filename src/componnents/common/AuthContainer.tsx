import Box from "@mui/material/Box";
import {useState} from "react";
import ProfileMenu from "./ProfileMenu.tsx";

const AuthContainer = () => {
    const [logged, setLogged] = useState<boolean>(false)
    const [openMenu, setOpenMenu] = useState(false);

    const handleLogout = () => {
        setOpenMenu(false);
        setLogged(false);
    }

    return (
        <>
            {!logged ?
                <Box>
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
        </>
    )
}

export default AuthContainer;