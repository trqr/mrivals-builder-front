import {useState} from "react";
import {
    Box,
    Button,
    Paper,
    TextField,
    Typography,
    Stack,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import SaveIcon from '@mui/icons-material/Save';
import {useAuth} from "../hooks/useAuth.tsx";
import type {UserType} from "../@types/UserType.ts";
import {changeUserMRaccount, changeUsername, changeUserPassword} from "../api/User.api.ts";
import {Visibility, VisibilityOff} from "@mui/icons-material";

const UserSettings = () => {
    const { user } = useAuth();
    const [currentUser, setCurrentUser] = useState<UserType>(user);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (field: keyof UserType, value: string) => {
        setCurrentUser({...currentUser, [field]: value});
    };

    const handleUsernameChange = async () => {
        await changeUsername(currentUser.username);
    };

    const handleMRaccountChange = async () => {
        await changeUserMRaccount(currentUser.id, currentUser.mrivalsAccount)
    };

    const handleChangePassword = async () => {
        if (newPassword !== confirmPassword) {
            return;
        }
        await changeUserPassword(oldPassword, newPassword);
    };

    return (
        <>
            <Typography variant={"h4"} sx={{textAlign: "center", margin: "30px"}}>Settings</Typography>
            <Box sx={{mx: "auto", mt: 4, display: "flex", justifyContent: "center", gap: "20px"}}>
                <Paper sx={{p: 4, borderRadius: 0, boxShadow: 4, width: 400}}>
                    <Typography variant="h5" gutterBottom>
                        User Information
                    </Typography>

                    <Stack spacing={3}>
                            <TextField
                                label="Username"
                                value={currentUser.username}
                                onChange={(e) => setCurrentUser({...currentUser, username: e.target.value})}
                                fullWidth
                                InputProps={{
                                    endAdornment: (
                                        <Button variant={"contained"} size={"small"} onClick={handleUsernameChange}>
                                            save
                                        </Button>
                                    ),
                                }}
                            />


                            <TextField
                                label="M-Rivals Account"
                                value={currentUser.mrivalsAccount}
                                onChange={(e) =>
                                    setCurrentUser({...currentUser, mrivalsAccount: e.target.value})
                                }
                                fullWidth
                                InputProps={{
                                    endAdornment: (
                                        <Button variant={"contained"} size={"small"} onClick={handleMRaccountChange}>
                                            save
                                        </Button>
                                    ),
                                }}
                            />

                        <TextField
                            label="Email"
                            value={currentUser.email}
                            disabled
                            fullWidth
                        />

                        <TextField
                            label="Role"
                            value={currentUser.role}
                            disabled
                            fullWidth
                        />
                    </Stack>
                </Paper>
                <Paper sx={{p: 4, borderRadius: 0, boxShadow: 4, width: 400}}>
                    <Typography variant="h5" gutterBottom>
                        Change Password
                    </Typography>

                    <Stack spacing={3}>
                        <TextField
                            type={showPassword ? "text" : "password"}
                            label="Current Password"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            fullWidth
                            InputProps={{
                                endAdornment: (
                                    <IconButton
                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                        onClick={() => setShowPassword((s) => !s)}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff/> : <Visibility/>}
                                    </IconButton>
                                ),
                            }}
                        />

                        <TextField
                            type={showPassword ? "text" : "password"}
                            label="New Password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            fullWidth
                            InputProps={{
                                endAdornment: (
                                    <IconButton
                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                        onClick={() => setShowPassword((s) => !s)}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff/> : <Visibility/>}
                                    </IconButton>
                                ),
                            }}
                        />

                        <TextField
                            type={showPassword ? "text" : "password"}
                            label="Confirm New Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            fullWidth
                            InputProps={{
                                endAdornment: (
                                    <IconButton
                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                        onClick={() => setShowPassword((s) => !s)}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff/> : <Visibility/>}
                                    </IconButton>
                                ),
                            }}
                        />

                        <Box sx={{textAlign: "right"}}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleChangePassword}
                            >
                                Update Password
                            </Button>
                        </Box>
                    </Stack>
                </Paper>
            </Box>
        </>

    );
};

export default UserSettings;
