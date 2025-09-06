import {Avatar, Divider, ListItemIcon, Menu, MenuItem} from "@mui/material"
import {AdminPanelSettings, Logout, Settings, ViewList} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../hooks/useAuth.tsx";
import Box from "@mui/material/Box";
import * as React from "react";
import {useState} from "react";

const ProfileMenu = () => {
    const navigate = useNavigate()
    // @ts-expect-error biendslecontect
    const {user, setUser} = useAuth();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    const open = Boolean(anchorEl);


    const handleLogout = () => {
        handleClose();
        setUser(null);
        localStorage.removeItem("MBtoken");
    }

    return (
        <>
            <Box sx={{position: "relative", cursor: "pointer", margin: "20px"}}
            >
                <Avatar
                    onClick={handleOpen}
                >
                </Avatar>
                    <Menu
                        anchorEl={anchorEl}
                        id="account-menu"
                        open={open}
                        onClose={handleClose}
                        onClick={handleClose}
                        slotProps={{
                            paper: {
                                elevation: 0,
                                sx: {
                                    overflow: 'visible',
                                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                    mt: 1.5,
                                    '& .MuiAvatar-root': {
                                        width: 25,
                                        height: 25,
                                        ml: -0.5,
                                        mr: 1,
                                    },
                                    '&::before': {
                                        content: '""',
                                        display: 'block',
                                        position: 'absolute',
                                        top: 0,
                                        right: 14,
                                        width: 10,
                                        height: 10,
                                        bgcolor: 'background.paper',
                                        transform: 'translateY(-50%) rotate(45deg)',
                                        zIndex: 0,
                                    },
                                },
                            },
                        }}
                        transformOrigin={{horizontal: 'right', vertical: 'top'}}
                        anchorOrigin={{horizontal: "right", vertical: 'bottom'}}
                    >
                        <MenuItem onClick={handleClose}>
                            <Avatar
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTx7sLJbdmCKh3Ko5fv9ahJsMGSZnIiRbz9Qg&s"/> My
                            Account
                        </MenuItem>
                        <Divider/>
                        <MenuItem onClick={() => navigate(`/user/teams`)}>
                            <ListItemIcon>
                                <ViewList fontSize="small"/>
                            </ListItemIcon>
                            Your Teams
                        </MenuItem>
                        {user.role === "ADMIN" && (
                            <MenuItem onClick={() => navigate("/admin")}>
                                <ListItemIcon>
                                    <AdminPanelSettings fontSize="small"/>
                                </ListItemIcon>
                                Administration
                            </MenuItem>
                        )}
                        <MenuItem onClick={() => navigate("/user/settings")}>
                            <ListItemIcon>
                                <Settings fontSize="small"/>
                            </ListItemIcon>
                            Settings
                        </MenuItem>
                        <MenuItem onClick={handleLogout}>
                            <ListItemIcon>
                                <Logout fontSize="small"/>
                            </ListItemIcon>
                            Logout
                        </MenuItem>
                    </Menu>
            </Box>

        </>
    )
}

export default ProfileMenu;