import {useState} from "react";
import {useSearchParams} from "react-router-dom";
import {
    Container,
    TextField,
    Button,
    Typography,
    Box,
    Paper, Alert
} from "@mui/material";
import axios from "axios";
import {resetPassword} from "../../api/Auth.api.ts";
import {useLoading} from "../../hooks/useLoading.tsx";
import {toast} from "react-toastify";
import {useNavigate} from "react-router";

const ResetPasswordPage = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [validationErrors, setValidationErrors] = useState<{ password?: string; confirmPassword?: string }>({})
    const [serverMsg, setServerMsg] = useState("")
    const [serverMsgSeverity, setServerMsgSeverity] = useState<"success" | "error">()
    const {isPending, startTransition} = useLoading();
    const navigate = useNavigate();

    const handleSubmit = async () => {
        if (!validate())
            return;
        setValidationErrors({password: "", confirmPassword: ""});
        startTransition(async () => {
            try {
                const data = await resetPassword(token!, password);
                setServerMsg(data);
                setServerMsgSeverity("success");
                await new Promise(resolve => setTimeout(resolve, 1000));
                navigate("/")
            } catch (err: any) {
                toast.error("Something went wrong.");
                setServerMsg(err);
                setServerMsgSeverity("error");
            }
        })
    }

    const validate = () => {
        const newErrors: { password?: string; confirmPassword?: string } = {};
        if (!password) {
            newErrors.password = "Password is required";
        } else if (password.length < 8) {
            newErrors.password = "Password must be at least 8 characters";
        } else if (!/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&._-])[A-Za-z\d@$!%*?&._-]{8,}$/.test(password)) {
            newErrors.password = "Password must have one uppercase letter, one number, and one special character.";
        }
        if (password !== confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }
        setValidationErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    if (!token) {
        return (
            <Container maxWidth="sm" sx={{mt: 5}}>
                <Typography variant={"h5"} sx={{textAlign: "center"}}>Reset password</Typography>
                <Alert sx={{margin: "40px"}} severity={"error"}>
                    Invalid reset link.
                </Alert>
            </Container>
        );
    }

    return (
        <Container maxWidth="sm" sx={{mt: 5}}>
            <Paper sx={{p: 4}}>
                <Typography variant="h5" gutterBottom>
                    Reset Password
                </Typography>

                <Box sx={{display: "flex", flexDirection: "column", gap: 2}}>
                    {serverMsg && <Alert severity={serverMsgSeverity}>{serverMsg}</Alert>}
                    <TextField
                        label="New Password"
                        type="password"
                        value={password}
                        error={!!validationErrors.password}
                        helperText={validationErrors.password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <TextField
                        label="Confirm Password"
                        type="password"
                        value={confirmPassword}
                        error={!!validationErrors.confirmPassword}
                        helperText={validationErrors.confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <Button
                        variant="contained"
                        onClick={handleSubmit}
                        disabled={isPending || !password || !confirmPassword}
                    >
                        {isPending ? "Saving..." : "Reset Password"}
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default ResetPasswordPage;
