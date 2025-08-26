import {
    Alert,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    InputAdornment, LinearProgress,
    Link,
    TextField
} from "@mui/material";
import {useState, useTransition} from "react";
import Box from "@mui/material/Box";
import {Visibility, VisibilityOff, LockOutlined} from "@mui/icons-material";
import {login} from "../../../api/Auth.service.ts";

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


    const handleChange = (field: keyof LoginDTO) =>
        (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoginValues({...loginValues, [field]: e.target.value})
    }

    const handleLogin = () => {
        startTransition( async () => {
            await new Promise(resolve => setTimeout(resolve, 1000));
            const authData = await login(loginValues);
            if (authData.user) {
                //set authcontext islooged true*
                setOpen(false)
                setLoginValues({email: "", password: ""})
            } else {
                setServerError(authData)
            }

        })
    }

    return (
        <>
            <Dialog open={open} fullWidth>
                {isPending &&
                    <LinearProgress></LinearProgress>
                }
                <DialogTitle>
                    <LockOutlined/>Sign in</DialogTitle>
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
                    ></TextField>
                    <TextField
                        label="Mot de passe"
                        type={!showPassword ? "password" : "text"}
                        autoComplete="current-password"
                        fullWidth
                        value={loginValues.password}
                        onChange={handleChange("password")}
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