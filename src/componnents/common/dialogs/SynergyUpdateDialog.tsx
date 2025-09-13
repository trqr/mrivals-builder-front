import {
    Box,
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    FormControlLabel,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from "@mui/material";
import {useEffect, useState} from "react";
import type {SynergieType} from "../../../@types/SynergieType.ts";
import {deleteSynergy} from "../../../api/Synergie.api.ts";
import {useData} from "../../../hooks/useData.tsx";

type SynergyUpdateDialogProps = {
    open: boolean;
    handleClose: () => void;
    handleSave: (allyId: number, value: number, isTeamUp: boolean, id?: number) => void;
    heroes: { id: number; name: string }[];
    editingSynergy?: SynergieType | null;
};

const SynergyUpdateDialog = ({open, handleClose, handleSave, heroes, editingSynergy}: SynergyUpdateDialogProps) => {
    const [allyId, setAllyId] = useState<number | "">("");
    const [value, setValue] = useState<number>(1);
    const [isTeamUp, setIsTeamUp] = useState<boolean>(false);
    const {refreshHeroes} = useData()

    const onSubmit = () => {
        if (allyId === "") return;
        handleSave(Number(allyId), value, isTeamUp, editingSynergy?.id);
        handleClose();
    };

    const handleDelete = async () => {
        if (editingSynergy) {
            await deleteSynergy(editingSynergy.id)
            await refreshHeroes();
        }
        handleClose();
    }

    useEffect(() => {
        if (editingSynergy) {
            setAllyId(editingSynergy.ally.id);
            setValue(editingSynergy.value);
            setIsTeamUp(editingSynergy.isTeamUp);
        } else {
            setAllyId("");
            setValue(1);
            setIsTeamUp(false);
        }
    }, [editingSynergy, open]);

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
            {editingSynergy ?
                <DialogActions sx={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                    <Button variant={"text"} color={"warning"} onClick={handleDelete}>Delete</Button>
                    <Box sx={{justifyContent: "flex-end", display: "flex", alignItems: "flex-end"}}>
                        <Button onClick={handleClose}>Annuler</Button>
                        <Button variant="contained" onClick={onSubmit}>
                            Submit
                        </Button>
                    </Box>
                </DialogActions>
                :
                <DialogActions>
                        <Button onClick={handleClose}>Annuler</Button>
                        <Button variant="contained" onClick={onSubmit}>
                            Submit
                        </Button>
                </DialogActions>
            }
        </Dialog>
    );
};

export default SynergyUpdateDialog;
