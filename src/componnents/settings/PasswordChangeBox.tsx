import {Visibility, VisibilityOff} from "@mui/icons-material"
import {Alert, Button, IconButton, Paper, Stack, TextField, Typography} from "@mui/material"
import Box from "@mui/material/Box";
import {changeUserPassword} from "../../api/User.api.ts";
import {useState} from "react";
import {useAuth} from "../../hooks/useAuth.tsx";
import SpotlightCard from "../common/cards/spotlightCard/SpotlightCard.tsx";

const PasswordChangeBox = () => {
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
    const { user } = useAuth();

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

    const handleChangePassword = async () => {
        if (!validatePassword()) {
            return;
        }
        const responseData = await changeUserPassword(oldPassword, newPassword);
        if (responseData.email === user!.email) {
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
        <>
            <SpotlightCard width={"400px"} className="settings-card" spotlightColor="rgba(0, 229, 255, 0.2)">
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
            </SpotlightCard>
        </>
    )
}

export default PasswordChangeBox