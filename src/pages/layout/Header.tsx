import Typography from '@mui/material/Typography';
import {useNavigate} from 'react-router';
import AuthBox from "../../componnents/common/AuthBox.tsx";
import Box from "@mui/material/Box";
import MainButton from "../../componnents/common/buttons/MainButton.tsx";
import {alpha, Button, IconButton, Menu, MenuItem, Stack} from "@mui/material";
import {useState, useEffect} from "react";
import MenuIcon from '@mui/icons-material/Menu';

import logo from "../../assets/images/IconSite.png";
import texte from "../../assets/images/texte.png";
import theme from '../../theme/theme.ts';

const menuPages = [
    {name: 'Home', path: '/'},
    {name: 'Builder', path: '/builder'},
    {name: 'Heroes', path: '/list'},
];

export default function Header() {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0 10px",
                position: "sticky",
                top: 0,
                width: "100%",
                zIndex: 2000,
                height: scrolled ? "70px" : "80px",
                backgroundColor: scrolled
                    ? alpha(theme.palette.background.default, 0.8)
                    : "transparent",
                transition: "all 0.3s ease-in-out"
            }}
        >
            <Box sx={{display: {xs: 'flex', md: 'none'}, width: "33%"}}>
                <IconButton
                    id="demo-positioned-button"
                    aria-controls={open ? 'demo-positioned-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                >
                    <MenuIcon/>
                </IconButton>
                <Menu
                    id="demo-positioned-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
                    transformOrigin={{vertical: 'top', horizontal: 'left'}}
                >
                    {menuPages.map((menuItem) => (
                        <MenuItem key={menuItem.name} onClick={() => navigate(menuItem.path)}>
                            {menuItem.name}
                        </MenuItem>
                    ))}
                </Menu>
            </Box>

            <Box
                sx={{display: "flex", alignItems: "center", cursor: "pointer", width: "33%", justifyContent:  {sm: "center", md: "flex-start"}}}
                onClick={() => navigate('/')}
            >
                <img height={scrolled ? 70 : 70} src={logo}/>
                <Box sx={{display: {xs: "none", sm: "flex"}}}>
                    <img height={scrolled ? 90 : 90} width={120} src={texte}/>
                </Box>
            </Box>

            <Box sx={{display: {xs: 'none', md: 'flex'}, width: "33%", justifyContent: "center", alignItems: "center"}}>
                {menuPages.map((page) => (
                    <MainButton
                        key={page.name}
                        onClick={() => navigate(page.path)}>
                        <span>{page.name}</span>
                    </MainButton>
                ))}
            </Box>

            <Stack width={"33%"} justifyContent={"flex-end"} alignItems={"flex-end"}>
                <AuthBox/>
            </Stack>
        </Box>
    );
}
