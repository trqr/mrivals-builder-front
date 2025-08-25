import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {useNavigate} from 'react-router';
import {AppBar, Avatar, Button} from "@mui/material";




const menuPages = [
    {name: 'Admin', path: '/Admin'},
    {name: 'Builder', path: '/Builder'},
    {name: 'héros/map', path: '/List'},
    {name: 'Acceuil', path: '/Home'},
];

export default function NavBar() {
    const navigate = useNavigate();

    return (
        <AppBar position="fixed" sx={{borderBottom: '3px solid #FDDE2B'}}>
            <Toolbar>
                <Typography variant="h6" noWrap sx={{ flexGrow: 1 }} component="div">
                    Rivals Builder
                </Typography>
                {menuPages.map((page) => (
                <Button
                    sx={{border: '1px solid #FDDE2B', margin: '5px'}}
                    key={page.name}
                    onClick={() => navigate(page.path)}>
                    {page.name}
                </Button>
                ))}
                <Avatar></Avatar>
            </Toolbar>
        </AppBar>
    );
}
