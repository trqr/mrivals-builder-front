import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    InputAdornment,
    LinearProgress,
    TextField
} from "@mui/material";
import {useState, useTransition} from "react";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {Alert} from "@mui/material";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import {register} from "../../../api/Auth.api.ts";
import SpotlightCard from "../cards/spotlightCard/SpotlightCard.tsx";

export type RegisterDTO = {
    username: string;
    mrivalsAccount: string;
    email: string;
    password: string;
}

type RegisterDialogProps = {
    open : boolean;
    setOpen: (open: boolean) => void;
}

const RegisterDialog = ({open, setOpen}: RegisterDialogProps) => {
    const [isPending, startTransition] = useTransition()
    const [showPassword, setShowPassword] = useState(false);
    const [registerValues, setRegisterValues] = useState<RegisterDTO>({username: "", mrivalsAccount: "", email: "", password: ""})
    const [serverError, setServerError] = useState<string | null>(null);
    const [validationErrors, setValidationErrors] = useState<{username?: string; email?: string; password?: string }>({})

    const handleChange = (field: keyof RegisterDTO) =>
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setRegisterValues({...registerValues, [field]: e.target.value})
        }

    const validate = () => {
        const newErrors: {username?: string; email?: string; password?: string } = {};
        if (!registerValues.username){
            newErrors.username = "Username is required";
        }
        if (!registerValues.email){
            newErrors.email = "Email is required";
        }  else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(registerValues.email)) {
            newErrors.email = "Email format is required";
        }
        if (!registerValues.password){
            newErrors.password = "Password is required";
        } else if (registerValues.password.length < 8) {
            newErrors.password = "Password must be at least 8 characters";
        }
        else if (!/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&._-])[A-Za-z\d@$!%*?&._-]{8,}$/.test(registerValues.password)) {
            newErrors.password = "Password must have one uppercase letter, one number, and one special character.";
        }
        setValidationErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const handleSubmit = () => {
        if (!validate()) {return}
        startTransition( async () => {
            await new Promise(resolve => setTimeout(resolve, 1000));

            const registerData = await register(registerValues);
            if (registerData.user){
                setOpen(false);
                setRegisterValues({username: "", mrivalsAccount: "", email: "", password: ""});
            } else {
                setServerError(registerData.data.message);
            }
        })
    }

    return (
        <>
            <Dialog open={open} onClose={() => setOpen(false)} fullWidth={true}>
                {isPending &&
                    <LinearProgress></LinearProgress>
                }
                <SpotlightCard width={"auto"} className="dialog-card" spotlightColor="rgba(0, 229, 255, 0.2)">
                <DialogTitle sx={{display: "flex", alignItems: "center"}}>
                    <PersonAddIcon  fontSize={"small"}/>{" Register"}
                </DialogTitle>
                <DialogContent sx={{display: 'flex', gap: '10px', flexDirection: 'column', margin: '10px auto', width: '100%', alignItems: 'center'}}>
                    {serverError && (
                        <Alert severity="error" onClose={() => setServerError(null)}>
                            {serverError}
                        </Alert>
                    )}
                            <TextField
                                label="Username"
                                type="text"
                                autoComplete="username"
                                fullWidth
                                disabled={isPending}
                                value={registerValues.username}
                                onChange={handleChange("username")}
                                error={!!validationErrors.username}
                                helperText={validationErrors.username}
                                required={true}
                            ></TextField>
                            <TextField
                                label="MRivals Account"
                                type="text"
                                autoComplete="mrivalsAccount"
                                fullWidth
                                disabled={isPending}
                                value={registerValues.mrivalsAccount}
                                onChange={handleChange("mrivalsAccount")}
                            ></TextField>
                            <TextField
                                label="Email"
                                type="email"
                                autoComplete="email"
                                fullWidth
                                disabled={isPending}
                                value={registerValues.email}
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
                                value={registerValues.password}
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
                <DialogActions>
                    <Button variant={"contained"} onClick={handleSubmit} disabled={isPending}>{isPending ? "Registering..." : "Submit"}</Button>
                    <Button variant={"text"} onClick={() => setOpen(false)}>Cancel</Button>
                </DialogActions>
                </SpotlightCard>
            </Dialog>
        </>
    )
}

export default RegisterDialog;