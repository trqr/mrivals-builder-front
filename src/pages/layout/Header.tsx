import Typography from '@mui/material/Typography';
import {useNavigate} from 'react-router';
import AuthBox from "../../componnents/common/AuthBox.tsx";
import Box from "@mui/material/Box";
import MainButton from "../../componnents/common/buttons/MainButton.tsx";
import logo from "../../images/IconSite.png";
import texte from "../../images/texte.png";

const menuPages = [
    {name: 'Home', path: '/'},
    {name: 'Builder', path: '/builder'},
    {name: 'Heroes', path: '/list'},
];

export default function Header() {
    const navigate = useNavigate();

    return (
        <>
            <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 10px"}}>
                <Box
                    sx={{display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer"}}
                    onClick={() => navigate('/')}
                >
                    <img height={70} src={logo}/>
                    <img height={90} width={120} src={texte}/>
                </Box>

                    <Box>
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
