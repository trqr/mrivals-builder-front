import { useNavigate } from 'react-router';
import AuthBox from "../../componnents/common/AuthBox.tsx";
import NavMenu from "../../componnents/common/NavMenu.tsx";
import Box from "@mui/material/Box";
import MainButton from "../../componnents/common/buttons/MainButton.tsx";
import { alpha } from "@mui/material";
import { useState, useEffect } from "react";

import logo from "../../assets/images/IconSite.png";
import texte from "../../assets/images/texte.png";
import theme from '../../theme/theme.ts';

const menuPages = [
    { name: 'Home', path: '/' },
    { name: 'Builder', path: '/builder' },
    { name: 'Heroes', path: '/list' },
];

export default function Header() {
    const navigate = useNavigate();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

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
            <Box
                sx={{ display: "flex", alignItems: "center", cursor: "pointer", width: { xs: "auto", md: "33%" }, justifyContent: "flex-start" }}
                onClick={() => navigate('/')}
            >
                <Box
                    component="img"
                    src={logo}
                    sx={{ height: scrolled ? { xs: 50, md: 70 } : { xs: 50, md: 70 } }}
                />
                <Box sx={{ display: "flex" }}>
                    <Box
                        component="img"
                        src={texte}
                        sx={{
                            height: scrolled ? { xs: 50, md: 90 } : { xs: 50, md: 90 },
                            width: { xs: 60, md: 120 }
                        }}
                    />
                </Box>
            </Box>

            <Box sx={{ display: { xs: 'none', md: 'flex' }, width: "33%", justifyContent: "center", alignItems: "center" }}>
                {menuPages.map((page) => (
                    <MainButton
                        key={page.name}
                        onClick={() => navigate(page.path)}>
                        <span>{page.name}</span>
                    </MainButton>
                ))}
            </Box>

            <Box sx={{ display: "flex", width: { xs: "auto", md: "33%" }, justifyContent: "flex-end", alignItems: "center", flexGrow: { xs: 1, md: 0 } }}>
                <AuthBox />
                <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                    <NavMenu pages={menuPages} />
                </Box>
            </Box>
        </Box>
    );
}
