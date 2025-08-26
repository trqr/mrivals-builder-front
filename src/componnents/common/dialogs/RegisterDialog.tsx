type RegisterDialogProps = {
    open : boolean;
    setOpen: (open: boolean) => void;
}

const RegisterDialog = ({open, setOpen}: RegisterDialogProps) => {
    return (
        <>
                </DialogContent>
                <DialogActions>
                    <Button variant={"text"} onClick={() => setOpen(false)}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default RegisterDialog;