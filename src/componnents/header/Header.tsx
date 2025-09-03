import Typography from '@mui/material/Typography';
import {useNavigate} from 'react-router';
import AuthContainer from "../common/AuthContainer.tsx";
import Box from "@mui/material/Box";
import MainButton from "../button/MainButton.tsx";

const menuPages = [
    {name: 'Accueil', path: '/'},
    {name: 'Builder', path: '/Builder'},
    {name: 'héros/map', path: '/List'},
];

export default function Header() {
    const navigate = useNavigate();

    return (
        <>
            <Box sx={{borderBottom: '1px solid #FDDE2B' , display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 10px"}}>
                <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                    <img height={40} style={{margin: "0 10px"}} src={"assets/logo.png"}/>Rivals Builder
                    <Typography variant="h6" noWrap component="div">
                    </Typography>
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
                    <AuthContainer></AuthContainer>
            </Box>
        </>
    );
}
