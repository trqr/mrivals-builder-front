import Typography from '@mui/material/Typography';
import {useNavigate} from 'react-router';
import AuthBox from "../../componnents/common/AuthBox.tsx";
import Box from "@mui/material/Box";
import MainButton from "../../componnents/common/buttons/MainButton.tsx";
import {Button, IconButton, Menu, MenuItem, Slide, useScrollTrigger} from "@mui/material";
import {useState} from "react";
import MenuIcon from '@mui/icons-material/Menu';

import logo from "../../assets/images/IconSite.png";
import texte from "../../assets/images/texte.png";


const menuPages = [
    {name: 'Home', path: '/'},
    {name: 'Builder', path: '/builder'},
    {name: 'Heroes', path: '/list'},
];


export default function Header() {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);


    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
                    <Box sx={{display: 'flex', justifyContent: "space-between", alignItems: "center", padding: "0 10px"}}>
                        <Box sx={{ display: { xs: 'flex', sm: 'flex', md: 'none', lg: 'none', xl: 'none' }}}>
                            <IconButton
                                id="demo-positioned-button"
                                aria-controls={open ? 'demo-positioned-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                            >
                                <MenuIcon></MenuIcon>
                            </IconButton>
                            <Menu
                                id="demo-positioned-menu"
                                aria-labelledby="demo-positioned-button"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                            >
                                {menuPages.map((menuItem) => (
                                    <MenuItem onClick={() => navigate(menuItem.path)}>{menuItem.name}</MenuItem>
                                ))}
                            </Menu>
                        </Box>
                        <Box
                            sx={{display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer"}}
                            onClick={() => navigate('/')}
                        >
                            <img height={70} src={logo}/>
                            <Box sx={{display: {xs: "none", sm: "flex"} }}>
                                <img height={90} width={120} src={texte}/>
                            </Box>
                        </Box>

                        <Box sx={{ display: { xs: 'none', sm: 'none', md: 'flex', lg: 'flex', xl: 'flex' } }}>
                            {menuPages.map((page) => (
                                <MainButton
                                    key={page.name}
                                    onClick={() => navigate(page.path)}>
                                    <span>{page.name}</span>
                                </MainButton>
                            ))}
                        </Box>
                        <AuthBox></AuthBox>
                    </Box>
        </>
    );
}
