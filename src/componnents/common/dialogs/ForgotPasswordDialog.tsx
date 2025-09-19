import {useState, useTransition} from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Typography, LinearProgress, Alert
} from "@mui/material";
import axios from "axios";
import {forgotPassword} from "../../../api/Auth.api.ts";
import SpotlightCard from "../cards/spotlightCard/SpotlightCard.tsx";

type ForgotPasswordDialogProps = {
    open: boolean;
    onClose: () => void;
};

const ForgotPasswordDialog = ({open, onClose}: ForgotPasswordDialogProps) => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [severity, setSeverity] = useState<"success" | "error">()
    const [isPending, startTransition] = useTransition()

    const handleSubmit = async () => {
        setMessage("");
        startTransition(async () => {
            try {
                await forgotPassword(email);
                setMessage("success");
                setSeverity("success");
            } catch (error: any) {
                setMessage("error");
                setSeverity("error");
            }
        })
    }

    return (
        <Dialog open={open} onClose={onClose}>
            {isPending && <LinearProgress variant={"indeterminate"}></LinearProgress>}
            <SpotlightCard width={"auto"} className="dialog-card" spotlightColor="rgba(0, 229, 255, 0.2)">
                <DialogTitle>Forgot Password</DialogTitle>
                <DialogContent>
                    <Typography variant="body2" sx={{mb: 2}}>
                        Enter your email address to receive a reset link.
                    </Typography>
                    <TextField
                        fullWidth
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoFocus
                    />
                    {message && (
                        <Alert
                            sx={{mt: 2}}
                            severity={severity}
                        >
                            {message}
                        </Alert>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} disabled={isPending}>
                        Cancel
                    </Button>
                    <Button variant={"contained"} onClick={handleSubmit} disabled={isPending || !email}>
                        {isPending ? "Sending..." : "Send"}
                    </Button>
                </DialogActions>
            </SpotlightCard>
        </Dialog>
    );
};

export default ForgotPasswordDialog;
