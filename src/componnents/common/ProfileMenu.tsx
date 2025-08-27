import {List, Paper} from "@mui/material";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import LogoutIcon from '@mui/icons-material/Logout';

type ProfileMenuProps = {
    handleLogout: () => void;
}

const ProfileMenu = ({handleLogout}: ProfileMenuProps) => {
    return (
        <>
            <Paper elevation={3}>
                <List>
                    <ListItemButton onClick={() => handleLogout()}>
                        <ListItem secondaryAction={
                            <IconButton edge="end" aria-label="add">
                                <LogoutIcon fontSize={"small"}></LogoutIcon>
                            </IconButton>}>
                            <ListItemText
                                primary={"Log out"}>
                            </ListItemText>
                        </ListItem>
                    </ListItemButton>
                </List>
            </Paper>

        </>
    )
}

export default ProfileMenu;