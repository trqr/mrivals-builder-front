import {useState, useTransition} from "react";
import Box from "@mui/material/Box";
import {Visibility, VisibilityOff, LockOutlined} from "@mui/icons-material";


type loginDialogProps = {
    open: boolean;
    setOpen: (open: boolean) => void;
}

    const [isPending, startTransition] = useTransition()
    const [showPassword, setShowPassword] = useState(false);



    return (
        <>
            <Dialog open={open} fullWidth>
                <DialogContent sx={{display: 'flex', gap: '10px', flexDirection: 'column', margin: '5px auto', width: '100%', alignItems: 'center'}}>
                    <TextField
                        label="Email"
                        type="email"
                        autoComplete="email"
                        fullWidth
                        disabled={isPending}
                    ></TextField>
                    <TextField
                        label="Mot de passe"
                        autoComplete="current-password"
                        fullWidth
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
                    <Button variant={"text"} onClick={() => setOpen(false)}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default LoginDialog;