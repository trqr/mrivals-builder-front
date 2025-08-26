import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";

type RegisterDialogProps = {
    open : boolean;
    setOpen: (open: boolean) => void;
}

const RegisterDialog = ({open, setOpen}: RegisterDialogProps) => {
    return (
        <>
            <Dialog open={open}>
                <DialogTitle>Register</DialogTitle>
                <DialogContent>
                    <TextField></TextField>
                    <TextField></TextField>
                    <TextField></TextField>
                </DialogContent>
                <DialogActions>
                    <Button variant={"contained"}>Submit</Button>
                    <Button variant={"text"} onClick={() => setOpen(false)}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default RegisterDialog;