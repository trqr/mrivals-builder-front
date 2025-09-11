import {useState} from "react";
import {
    Box,
    Button,
    Paper,
    TextField,
    Typography,
    Stack, Alert,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {useAuth} from "../hooks/useAuth.tsx";
import type {UserType} from "../@types/UserType.ts";
import {changeUserMRaccount, changeUsername, changeUserPassword} from "../api/User.api.ts";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import Page from "./layout/Page.tsx";
import {useUserData} from "../hooks/useUserData.tsx";

const UserSettings = () => {
    // @ts-expect-error bien dans le context
    const { user } = useAuth();
    const [currentUser, setCurrentUser] = useState<UserType>(user);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [successMsg, setSuccessMsg] = useState<string | null>(null)
    const [serverError, setServerError] = useState<string | null>(null)
    const [passwordValidationErrors, setPasswordValidationErrors] = useState<{
        password?: string;
        confirmPass?: string
    }>({})
    const {setUser} = useAuth();
    const {setUserGameStats} = useUserData();

    const validatePassword = () => {
        const newErrors: {confirmPass?: string; password?: string } = {};
        if (!newPassword) {
            newErrors.password = "Password is required";
        } else if (newPassword.length < 8) {
            newErrors.password = "Password must be at least 8 characters";
        } else if (!/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&._-])[A-Za-z\d@$!%*?&._-]{8,}$/.test(newPassword)) {
            newErrors.password = "Password must have one uppercase letter, one number, and one special character.";
        }
        if (newPassword !== confirmPassword) {
            newErrors.confirmPass = "Passwords does not match.";
        }
        setPasswordValidationErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const handleUsernameChange = async () => {
        await changeUsername(currentUser.username);
        setUser(currentUser);
    };

    const handleMRaccountChange = async () => {
        await changeUserMRaccount(currentUser.id, currentUser.mrivalsAccount);
        setUser(currentUser);
        setUserGameStats(currentUser.mrivalsAccount);
    };

    const handleChangePassword = async () => {
        if (!validatePassword()) {
            return;
        }
        const responseData = await changeUserPassword(oldPassword, newPassword);
        if (responseData.email === user.email) {
            setSuccessMsg(`Password changed successfully.`)
            setNewPassword("")
            setConfirmPassword("")
            setOldPassword("")
            setShowPassword(false);
        } else {
            setServerError(responseData)
        }

    };

    return (
        <Page title={"Settings"} description={"User Settings"}>
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
                                error={!currentUser.username}
                                helperText={!currentUser.username ? "Please enter your username" : ""}
                                InputProps={{
                                    endAdornment: (
                                        <Button variant={"contained"} size={"small"} onClick={handleUsernameChange}
                                                disabled={!currentUser.username}
                                        >
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
                    {serverError && (
                        <Alert sx={{margin: "10px 0px"}} severity="error" onClose={() => setServerError(null)}>
                            {serverError}
                        </Alert>
                    )}
                    {successMsg && (
                        <Alert sx={{margin: "10px 0px"}} severity="success" onClose={() => setSuccessMsg(null)}>
                            {successMsg}
                        </Alert>
                    )}
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
                            error={!!passwordValidationErrors.password}
                            helperText={passwordValidationErrors.password}
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
                            error={!!passwordValidationErrors.confirmPass}
                            helperText={passwordValidationErrors.confirmPass}
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
        </Page>

    );
};

export default UserSettings;
