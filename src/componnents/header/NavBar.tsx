import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {useNavigate} from 'react-router';
import {AppBar, Button} from "@mui/material";
import AuthContainer from "../common/AuthContainer.tsx";

const menuPages = [
    {name: 'Admin', path: '/Admin'},
    {name: 'Builder', path: '/Builder'},
    {name: 'héros/map', path: '/List'},
    {name: 'Acceuil', path: '/'},
];

export default function NavBar() {
    const navigate = useNavigate();

    return (
        <AppBar sx={{borderBottom: '3px solid #FDDE2B'}}>
            <Toolbar>
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
            </Toolbar>
        </AppBar>
    );
}
