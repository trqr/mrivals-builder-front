import {
    Alert,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    InputAdornment,
    LinearProgress,
    Link,
    TextField
} from "@mui/material";
import {useState, useTransition} from "react";
import Box from "@mui/material/Box";
import {LockOutlined, Visibility, VisibilityOff} from "@mui/icons-material";
import {login} from "../../../api/Auth.api.ts";
import {useAuth} from "../../../hooks/useAuth.tsx";
import {useUserData} from "../../../hooks/useUserData.tsx";

export type LoginDTO = {
    email: string;
    password: string;
}

type loginDialogProps = {
    open: boolean;
    setOpen: (open: boolean) => void;
}

const LoginDialog = ({open, setOpen}: loginDialogProps) => {
    const [isPending, startTransition] = useTransition()
    const [showPassword, setShowPassword] = useState(false);
    const [loginValues, setLoginValues] = useState<LoginDTO>({email: "", password: ""})
    const [serverError, setServerError] = useState<string | null>(null);
    const [validationErrors, setValidationErrors] = useState<{ email?: string; password?: string }>({})
    const { setUser } = useAuth();


    const handleChange = (field: keyof LoginDTO) =>
        (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoginValues({...loginValues, [field]: e.target.value})
    }

    const handleLogin = () => {
        if (!validate())
            return;
        startTransition( async () => {
            await new Promise(resolve => setTimeout(resolve, 1000));
            const authData = await login(loginValues);
            if (authData.user) {
                setUser(authData.user);
                setOpen(false)
                setLoginValues({email: "", password: ""})
                localStorage.setItem("MBtoken", authData.token)
            } else {
                setServerError(authData)
            }
        })
    }

    const validate = () => {
        const newErrors: { email?: string; password?: string } = {};
        if (!loginValues.email){
            newErrors.email = "Email is required";
        }  else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(loginValues.email)) {
            newErrors.email = "Email format is required";
        }
        if (!loginValues.password){
            newErrors.password = "Password is required";
        } else if (loginValues.password.length < 8) {
            newErrors.password = "Password must be at least 8 characters";
        }
        else if (!/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&._-])[A-Za-z\d@$!%*?&._-]{8,}$/.test(loginValues.password)) {
            newErrors.password = "Password must have one uppercase letter, one number, and one special character.";
        }
        setValidationErrors(newErrors);
        console.log("test")
        return Object.keys(newErrors).length === 0;
    }



    return (
        <>
            <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
                {isPending &&
                    <LinearProgress></LinearProgress>
                }
                <DialogTitle sx={{display: "flex", alignItems: "center"}}>
                    <LockOutlined fontSize={"small"}/>Sign in</DialogTitle>
                <DialogContent sx={{display: 'flex', gap: '10px', flexDirection: 'column', margin: '5px auto', width: '100%', alignItems: 'center'}}>
                    {serverError && (
                        <Alert severity="error" onClose={() => setServerError(null)}>
                            {serverError}
                        </Alert>
                    )}
                    <TextField
                        label="Email"
                        type="email"
                        autoComplete="email"
                        fullWidth
                        disabled={isPending}
                        value={loginValues.email}
                        onChange={handleChange("email")}
                        error={!!validationErrors.email}
                        helperText={validationErrors.email}
                        required={true}
                    ></TextField>
                    <TextField
                        label="Password"
                        type={!showPassword ? "password" : "text"}
                        autoComplete="current-password"
                        fullWidth
                        value={loginValues.password}
                        onChange={handleChange("password")}
                        error={!!validationErrors.password}
                        helperText={validationErrors.password}
                        required={true}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                        onClick={() => setShowPassword((s) => !s)}
                                        edge="end"
                                        disabled={isPending}
                                    >
                                        {showPassword ? <VisibilityOff/> : <Visibility/>}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    ></TextField>
                </DialogContent>
                <Box sx={{display: "flex", alignItems: "center", margin: "0 20px"}}>
                    <Link  underline="hover">
                        Forgotten password?
                    </Link>
                </Box>
                <DialogActions>
                    <Button variant={"contained"} onClick={handleLogin} disabled={isPending}>{isPending ? "Loging in..." : "Login"}</Button>
                    <Button variant={"text"} onClick={() => setOpen(false)}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default LoginDialog;