import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {useNavigate} from 'react-router';
import {AppBar, Button} from "@mui/material";
import AuthContainer from "../common/AuthContainer.tsx";
import Box from "@mui/material/Box";

const menuPages = [
    {name: 'Admin', path: '/Admin'},
    {name: 'Builder', path: '/Builder'},
    {name: 'héros/map', path: '/List'},
    {name: 'Acceuil', path: '/'},
];

export default function Header() {
    const navigate = useNavigate();

    return (
        <Box sx={{borderBottom: '3px solid #FDDE2B' , display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                <Typography variant="h6" noWrap sx={{ flexGrow: 1 }} component="div">
                    Rivals Builder
                </Typography>
                {menuPages.map((page) => (
                <Button
                    sx={{border: '1px solid #FDDE2B', margin: '5px'}}
                    variant={"contained"}
                    key={page.name}
                    onClick={() => navigate(page.path)}>
                    {page.name}
                </Button>
                ))}
                <AuthContainer></AuthContainer>
        </Box>
    );
}
