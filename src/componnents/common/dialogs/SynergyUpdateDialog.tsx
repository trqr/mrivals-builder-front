import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Box,
    TextField,
    Checkbox,
    FormControlLabel,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
} from "@mui/material";
import {useState} from "react";

type SynergyUpdateDialogProps = {
    open: boolean;
    handleClose: () => void;
    handleSave: (allyId: number, value: number, isTeamUp: boolean) => void;
    heroes: { id: number; name: string }[];
};

const SynergyUpdateDialog = ({
                              open,
                              handleClose,
                              handleSave,
                              heroes,
                          }: SynergyUpdateDialogProps) => {
    const [allyId, setAllyId] = useState<number | "">("");
    const [value, setValue] = useState<number>(1);
    const [isTeamUp, setIsTeamUp] = useState<boolean>(false);

    const onSubmit = () => {
        if (allyId === "") return;
        handleSave(Number(allyId), value, isTeamUp);
        handleClose();
        setAllyId("");
        setValue(1);
        setIsTeamUp(false);
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
            <DialogTitle>Add or Update a synergy</DialogTitle>
            <DialogContent>
                <Box sx={{display: "flex", flexDirection: "column", gap: 2, mt: 1}}>

                    <FormControl fullWidth>
                        <InputLabel id="ally-label">Ally</InputLabel>
                        <Select
                            labelId="ally-label"
                            value={allyId}
                            onChange={(e) => setAllyId(e.target.value as number)}
                        >
                            {heroes.map((h) => (
                                <MenuItem key={h.id} value={h.id}>
                                    {h.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <TextField
                        label="Value"
                        type="number"
                        value={value}
                        onChange={(e) => setValue(Number(e.target.value))}
                        fullWidth
                    />

                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={isTeamUp}
                                onChange={(e) => setIsTeamUp(e.target.checked)}
                            />
                        }
                        label="Team Up ?"
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Annuler</Button>
                <Button variant="contained" onClick={onSubmit}>
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default SynergyUpdateDialog;
